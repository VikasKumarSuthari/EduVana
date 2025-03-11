import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
// import Dashboard from './pages/Dashboard'
import UnitPage from './pages/UnitPage'
// import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-area">
          <Routes>
         
            <Route path="/student/subject/:subjectId" element={<UnitPage />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;