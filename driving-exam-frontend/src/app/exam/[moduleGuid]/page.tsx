'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

type Question = {
    guid: string
    number: number
    text: string
    points: number
    imageUrl?: string
    moduleGuid: string
    correctAnswerGuid: string
    answers: {
        guid: string
        text: string
        isCorrect: boolean
    }[]
}

export default function ExamPage() {
    const { moduleGuid } = useParams<{ moduleGuid: string }>()
    const router = useRouter()

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: boolean }>({})
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`https://localhost:5443/api/questions/exam/${moduleGuid}?count=20`)
                if (!response.ok) throw new Error(`Fehler beim Laden: ${response.status}`)
                const data: Question[] = await response.json()
                setQuestions(data)
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Unbekannter Fehler beim Laden der Fragen')
                }
            }
        }

        fetchQuestions()
    }, [moduleGuid])

    const handleAnswerChange = (guid: string, isChecked: boolean) => {
        setSelectedAnswers({ ...selectedAnswers, [guid]: isChecked })
    }

    const saveResults = () => {
        const examResults = questions.map((question) => {
            const correctAnswers = question.answers.filter(a => a.isCorrect).map(a => a.guid)
            const selectedAnswersForQuestion = Object.keys(selectedAnswers).filter(guid => selectedAnswers[guid])
            const correct = correctAnswers.every(guid => selectedAnswersForQuestion.includes(guid))

            return {
                module: question.moduleGuid,
                number: question.number,
                correct: correct,
                date: new Date().toISOString(),
            }
        })

        const existingResults = localStorage.getItem('exam_results')
            ? JSON.parse(localStorage.getItem('exam_results') as string)
            : []

        const newResults = [...existingResults, ...examResults]
            .filter((value, index, self) =>
                index === self.findIndex((t) => t.number === value.number && t.date === value.date)
            )

        localStorage.setItem('exam_results', JSON.stringify(newResults))
    }

    const handleNext = () => {
        const current = questions[currentIndex]
        const correct = current.answers.filter(a => a.isCorrect).map(a => a.guid)
        const selected = Object.keys(selectedAnswers).filter(guid => selectedAnswers[guid])
        const isCorrect = correct.length === selected.length && correct.every(guid => selected.includes(guid))
        if (isCorrect) setScore(prev => prev + current.points)

        const next = currentIndex + 1
        if (next < questions.length) {
            setCurrentIndex(next)
            setSelectedAnswers({})
        } else {
            saveResults()
            setFinished(true)
        }
    }

    const handleFinishExam = () => {
        saveResults()
        router.push('/exam/results')
    }

    if (error) return <p style={{ color: 'red' }}>Fehler: {error}</p>
    if (questions.length === 0) return <p>Fragen werden geladen...</p>

    if (finished) {
        return (
            <div>
                <h1>Prüfung abgeschlossen ✅</h1>
                <p>Du hast {score} von {questions.reduce((sum, q) => sum + q.points, 0)} Punkten erreicht.</p>
                <button onClick={() => router.push('/')}>Zurück zur Startseite</button>
                <button onClick={() => router.push('/exam/results')} style={{ marginTop: '10px' }}>
                    Ergebnisse anzeigen
                </button>
            </div>
        )
    }

    const question = questions[currentIndex]

    return (
        <div>
            <h2>Frage {currentIndex + 1} von {questions.length}</h2>
            <p>{question.text}</p>
            {question.imageUrl && (
                <Image src={question.imageUrl} alt="Fragenbild" width={400} height={200} />
            )}
            <ul>
                {question.answers.map((answer) => (
                    <li key={answer.guid}>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!selectedAnswers[answer.guid]}
                                onChange={(e) => handleAnswerChange(answer.guid, e.target.checked)}
                            />
                            {answer.text}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleNext}>Weiter</button>
            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={handleFinishExam}
                    style={{ padding: '0.5rem 1rem', backgroundColor: 'green', color: 'white' }}
                >
                    Prüfung beenden
                </button>
            </div>
        </div>
    )
}
