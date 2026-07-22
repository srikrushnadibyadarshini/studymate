import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Summarizer from './pages/Summarizer'
import QuizGenerator from './pages/QuizGenerator'
import StudyPlanner from './pages/StudyPlanner'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/summarizer" element={<Summarizer />} />
      <Route path="/quiz" element={<QuizGenerator />} />
      <Route path="/planner" element={<StudyPlanner />} />
    </Routes>
  )
}

export default App