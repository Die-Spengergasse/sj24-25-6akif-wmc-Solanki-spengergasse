import { useState } from 'react'
import Image from 'next/image'

type Question = {
    guid: string
    number: number
    text: string
    imageUrl?: string
    answers: {
        guid: string
        text: string
    }[]
}

type Props = {
    questions: Question[]
}

export default function QuestionList({ questions }: Props) {
    const [checkedAnswers, setCheckedAnswers] = useState<{ [key: string]: boolean }>({})
    const [results, setResults] = useState<{ [key: string]: boolean }>({})
    const [submitted, setSubmitted] = useState<string | null>(null)

    const handleCheck = (answerGuid: string, isChecked: boolean) => {
        setCheckedAnswers({ ...checkedAnswers, [answerGuid]: isChecked })
    }

    const handleSubmit = async (questionGuid: string) => {
        const payload = {
            checkedAnswers: Object.entries(checkedAnswers).map(([guid, isChecked]) => ({
                guid,
                isChecked
            }))
        }

        const res = await fetch(`/api/questions/${questionGuid}/checkanswers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        const data = await res.json()
        setResults(data.checkResult)
        setSubmitted(questionGuid)
    }

    if (questions.length === 0) {
        return <p>Keine Fragen gefunden.</p>
    }

    return (
        <ul>
            {questions.map((q) => (
                <li key={q.guid} style={{ marginBottom: '3rem', borderBottom: '1px solid #ccc', paddingBottom: '2rem' }}>
                    <strong>Frage {q.number}</strong>
                    <p>{q.text}</p>
                    {q.imageUrl && (
                        <Image src={q.imageUrl} alt="Bild zur Frage" width={400} height={300} />
                    )}
                    <ul>
                        {q.answers.map((a) => {
                            const isIncorrect = submitted === q.guid && results[a.guid] === false
                            return (
                                <li key={a.guid} style={{ color: isIncorrect ? 'red' : 'black' }}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheck(a.guid, e.target.checked)}
                                        />{' '}
                                        {a.text}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={() => handleSubmit(q.guid)} disabled={submitted === q.guid}>
                        Antworten überprüfen
                    </button>
                </li>
            ))}
        </ul>
    )
}
