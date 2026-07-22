import { useState } from 'react'
import callGemini from '../services/Gemini'

function Summarizer() {
  const [notes, setNotes] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
console.log("Key loaded:", import.meta.env.VITE_GEMINI_API_KEY ? "yes" : "no")
  async function handleSummarize() {
    if (!notes.trim()) return

    setLoading(true)
    setError("")
    setSummary("")

    try {
      const prompt = `Summarize the following notes into clear, concise bullet points. Do not use any markdown formatting like asterisks or bold text — plain text only. Keep it short and easy to revise from:\n\n${notes}`
      const result = await callGemini(prompt)
      setSummary(result)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink font-body px-8 py-10">
      <h1 className="font-display text-3xl font-bold mb-2">Notes Summarizer</h1>
      <p className="text-ink/60 mb-6">Paste your notes below and get a clean summary.</p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
        rows={10}
        className="w-full max-w-2xl p-4 border border-mist rounded-xl bg-white/70 
                   focus:outline-none focus:ring-2 focus:ring-indigo resize-none"
      />

      <div className="mt-4">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-6 py-2 bg-indigo text-white rounded-lg cursor-pointer
                     hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}

      {summary && (
        <div className="mt-6 max-w-2xl p-5 bg-white/70 backdrop-blur-sm border border-mist rounded-xl">
          <h3 className="font-display font-semibold mb-2">Summary</h3>
          <p className="whitespace-pre-line text-ink/80">{summary}</p>
        </div>
      )}
    </div>
  )
}

export default Summarizer