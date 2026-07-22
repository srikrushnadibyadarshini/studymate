import { useState } from 'react'
import callGemini from '../services/Gemini'

function StudyPlanner() {
  const [topic, setTopic] = useState("")
  const [days, setDays] = useState("")
  const [plan, setPlan] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handlePlan() {
    const numDays = Number(days)

  if (!topic.trim() || !days.trim()) return

  if (!Number.isInteger(numDays) || numDays <= 0) {
    setError("Please enter a valid number of days (1 or more).")
    return
  }

  if (numDays > 30) {
    setError("Please enter 30 days or fewer for a realistic plan.")
    return
  }
    setLoading(true)
    setError("")
    setPlan("")

    try {
      const prompt = `Create a realistic day-by-day study plan for "${topic}" over ${days} days.And be realistic regarding the number of days. Do not use markdown formatting like asterisks or bold text — plain text only. Format it clearly as "Day 1:", "Day 2:", etc., each followed by 2-3 short focus points.`

      const result = await callGemini(prompt)
      setPlan(result)
    } catch (err) {
      console.error(err)
      setError("Something went wrong generating the plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-body px-8 py-10">
      <h1 className="font-display text-3xl font-bold mb-2">Study Planner</h1>
      <p className="text-ink/60 mb-6">Tell us what you're studying and how much time you have.</p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Semiconductor Physics"
          className="flex-1 p-3 border border-mist rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo"
        />
        <input
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Days (e.g. 5)"
          type="number"
          min="1"
          className="sm:w-32 p-3 border border-mist rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo"
        />
        <button
          onClick={handlePlan}
          disabled={loading}
          className="px-6 py-2 bg-indigo text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Planning..." : "Generate Plan"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {plan && (
        <div className="mt-6 max-w-2xl p-5 bg-white/70 backdrop-blur-sm border border-mist rounded-xl">
          <h3 className="font-display font-semibold mb-2">Your Plan</h3>
          <p className="whitespace-pre-line text-ink/80">{plan}</p>
        </div>
      )}
    </div>
  )
}

export default StudyPlanner