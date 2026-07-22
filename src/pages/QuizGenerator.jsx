import { useState } from 'react'
import callGemini from '../services/Gemini'

function QuizGenerator() {
  const [topic, setTopic] = useState("")
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [answers, setAnswers] = useState({})

  async function handleGenerate() {
    if (!topic.trim()) return
    setLoading(true)
    setError("")
    setQuiz(null)
    setAnswers({})

    try {
      const prompt = `Create a 10-question multiple choice quiz on "${topic}". Respond with ONLY valid JSON, no markdown, no extra text, in this exact structure:[{"question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0}, ...]`

      const result = await callGemini(prompt)
      const cleaned = result.replace(/```json|```/g, "").trim()
      const parsed = JSON.parse(cleaned)
      setQuiz(parsed)
    } catch (err) {
      console.error(err)
      setError("Something went wrong generating the quiz. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function selectAnswer(qIndex, optIndex) {
    if (answers[qIndex] !== undefined) return
    setAnswers({ ...answers, [qIndex]: optIndex })
  }

  const score = quiz
    ? quiz.reduce((total, q, i) => total + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : 0
  const allAnswered = quiz && Object.keys(answers).length === quiz.length

  return (
    <div className="min-h-screen bg-paper text-ink font-body px-8 py-10">
      <h1 className="font-display text-3xl font-bold mb-2">Quiz Generator</h1>
      <p className="text-ink/60 mb-6">Enter a topic and test yourself.</p>

      <div className="flex gap-3 max-w-xl">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Newton's Laws of Motion"
          className="flex-1 p-3 border border-mist rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2 bg-indigo text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {quiz && (
        <div className="mt-6 max-w-2xl space-y-4">
          {quiz.map((q, i) => (
            <div key={i} className="p-5 bg-white/70 backdrop-blur-sm border border-mist rounded-xl">
              <p className="font-semibold mb-3">{i + 1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, j) => {
                  const isSelected = answers[i] === j
                  const isCorrect = j === q.correctIndex
                  const showResult = answers[i] !== undefined

                  let style = "border-mist"
                  if (showResult && isCorrect) style = "border-green-500 bg-green-50"
                  else if (showResult && isSelected && !isCorrect) style = "border-red-500 bg-red-50"

                  return (
                    <button
                      key={j}
                      onClick={() => selectAnswer(i, j)}
                      className={`text-left px-4 py-2 border rounded-lg cursor-pointer transition-colors ${style}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {allAnswered && (
            <div className="p-5 bg-indigo/10 border border-indigo/30 rounded-xl font-semibold">
              Score: {score} / {quiz.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuizGenerator