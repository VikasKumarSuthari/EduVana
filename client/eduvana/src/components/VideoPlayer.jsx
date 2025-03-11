import React from "react";
import "./VideoPlayer.css";

function VideoPlayer({ videoUrl }) {
  return (
    <div className="video-player">
      <h3>Video Lesson</h3>
      <div className="video-container">
        {/* Replace with actual video player component */}
        <div className="placeholder-video">
          <p>Video Player</p>
          <p>URL: {videoUrl}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;