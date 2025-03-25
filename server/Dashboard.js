const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/learning-dashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Subject Schema
const subjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  progress: { type: Number, default: 0 },
  lessons: [
    {
      title: String,
      content: String,
      completed: { type: Boolean, default: false },
    },
  ],
});

// Subject Model
const Subject = mongoose.model("Subject", subjectSchema);

// Routes
// Get all subjects
app.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific subject by ID
app.get("/api/subjects/:id", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new subject
app.post("/api/subjects", async (req, res) => {
  const subject = new Subject(req.body);
  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update subject progress
app.patch("/api/subjects/:id/progress", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    subject.progress = req.body.progress;
    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update lesson completion
app.patch("/api/subjects/:id/lessons/:lessonIndex", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const lessonIndex = parseInt(req.params.lessonIndex);
    if (!subject.lessons[lessonIndex])
      return res.status(404).json({ message: "Lesson not found" });

    subject.lessons[lessonIndex].completed = req.body.completed;

    // Recalculate progress
    const completedLessons = subject.lessons.filter(
      (lesson) => lesson.completed
    ).length;
    subject.progress = Math.round(
      (completedLessons / subject.lessons.length) * 100
    );

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// AI Content Generation
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDVDNBDVaY6QFXpOqh4wXySZf0-ATjQ0Sc");

app.post("/api/generate-content", async (req, res) => {
  const { topic } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(`Generate content on ${topic}`);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.post("/api/generate-quiz", async (req, res) => {
  const { topic } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Generate a quiz with 5 questions on ${topic}`
    );
    const response = await result.response;
    const text = response.text();

    // Parse the generated text into quiz questions
    const questions = parseQuizQuestions(text);

    res.json({ questions });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

function parseQuizQuestions(text) {
  // This function should parse AI-generated text into structured quiz format.
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const questions = [];
  let currentQuestion = null;

  lines.forEach((line) => {
    if (line.startsWith("Q: ")) {
      if (currentQuestion) questions.push(currentQuestion);
      currentQuestion = {
        question: line.replace("Q: ", "").trim(),
        options: [],
        answer: "",
      };
    } else if (line.startsWith("A: ")) {
      if (currentQuestion) currentQuestion.answer = line.replace("A: ", "").trim();
    } else if (line.startsWith("- ")) {
      if (currentQuestion) currentQuestion.options.push(line.replace("- ", "").trim());
    }
  });

  if (currentQuestion) questions.push(currentQuestion);
  return questions;
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
