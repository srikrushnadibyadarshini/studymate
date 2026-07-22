import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import getGreeting from '../utils/greeting'


function Dashboard() {
  const greeting=getGreeting()
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Topbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-mist">
        <span className="font-display text-xl font-bold text-indigo">
          StudyMate
        </span>
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/summarizer" className="hover:text-indigo transition-colors">Summarizer</Link>
          <Link to="/quiz" className="hover:text-indigo transition-colors">Quiz</Link>
          <Link to="/planner" className="hover:text-indigo transition-colors">Planner</Link>
        </nav>
      </header>

      {/* Greeting with glow */}
      <section className="relative px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber/30 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <h1 className="font-display text-5xl font-bold">
            {greeting.text} {greeting.emoji}
          </h1>
          <p className="mt-3 text-lg text-ink/60">
            Ready to study? Pick up where you left off.
          </p>
          
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <FeatureCard
            icon="📝"
            title="Notes Summarizer"
            description="Paste your notes, get a clean, concise summary in seconds."
            href="/summarizer"
          />
          <FeatureCard
            icon="🧠"
            title="Quiz Generator"
            description="Turn any topic into a quick self-test quiz."
            href="/quiz"
          />
          <FeatureCard
            icon="🗓️"
            title="Study Planner"
            description="Get a realistic day-by-day plan before your exam."
            href="/planner"
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard