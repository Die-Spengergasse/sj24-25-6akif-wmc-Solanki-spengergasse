'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Question = {
    guid: string
    number: number
    text: string
    imageUrl?: string
    answers: {
        guid: string
        text: string
        isCorrect?: boolean
    }[]
}

export default function QuestionPage({
    params,
}: {
    params: Promise<{ moduleGuid: string; topicGuid: string }>
}) {
    const { moduleGuid, topicGuid } = use(params)
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [checked, setChecked] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetch(
            `http://localhost:5080/api/questions?moduleGuid=${moduleGuid}&topicGuid=${topicGuid}`
        )
            .then((res) => res.json())
            .then((data) => setQuestions(data))
    }, [moduleGuid, topicGuid])

    if (questions.length === 0) {
        return <p>Fragen werden geladen…</p>
    }

    const currentQuestion = questions[currentIndex]

    const handleToggle = (answerGuid: string) => {
        if (checked) return
        setSelectedAnswers((prev) =>
            prev.includes(answerGuid)
                ? prev.filter((g) => g !== answerGuid)
                : [...prev, answerGuid]
        )
    }

    const handleCheck = () => {
        setChecked(true)
    }

    const handleNext = () => {
        const correctAnswers = currentQuestion.answers
            .filter((a) => a.isCorrect)
            .map((a) => a.guid)

        const incorrectAnswers = currentQuestion.answers
            .filter((a) => !a.isCorrect)
            .map((a) => a.guid)

        const allCorrectSelected = correctAnswers.every((g) =>
            selectedAnswers.includes(g)
        )
        const noIncorrectSelected = !incorrectAnswers.some((g) =>
            selectedAnswers.includes(g)
        )

        const isCorrect = allCorrectSelected && noIncorrectSelected

        const result = {
            number: currentQuestion.number,
            correct: isCorrect,
        }

        const prev = localStorage.getItem('exam_results')
        const current = prev ? JSON.parse(prev) : []
        localStorage.setItem('exam_results', JSON.stringify([...current, result]))

        setSelectedAnswers([])
        setChecked(false)

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        } else {
            router.push('/results')
        }
    }

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Frage {currentIndex + 1} von {questions.length}</h1>
            <p>{currentQuestion.text}</p>

            {currentQuestion.imageUrl && (
                <Image
                    src={currentQuestion.imageUrl}
                    alt="Fragebild"
                    width={400}
                    height={300}
                    style={{ marginTop: '1rem', height: 'auto', width: '100%' }}
                />
            )}

            <div style={{ marginTop: '1rem' }}>
                {currentQuestion.answers.map((a) => {
                    const isSelected = selectedAnswers.includes(a.guid)
                    const showCorrect = checked && a.isCorrect && isSelected
                    const showWrong = checked && !a.isCorrect && isSelected

                    return (
                        <div key={a.guid} style={{
                            marginBottom: '0.5rem',
                            backgroundColor: showWrong ? '#ffcccc' : showCorrect ? '#ccffcc' : 'transparent',
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={a.guid}
                                    disabled={checked}
                                    checked={isSelected}
                                    onChange={() => handleToggle(a.guid)}
                                />{' '}
                                {a.text}
                            </label>
                        </div>
                    )
                })}
            </div>

            {!checked ? (
                <button
                    onClick={handleCheck}
                    disabled={selectedAnswers.length === 0}
                    style={{ marginTop: '1rem' }}
                >
                    Überprüfen
                </button>
            ) : (
                <button onClick={handleNext} style={{ marginTop: '1rem' }}>
                    {currentIndex < questions.length - 1
                        ? 'Nächste Frage'
                        : 'Auswertung anzeigen'}
                </button>
            )}
        </main>
    )
}
