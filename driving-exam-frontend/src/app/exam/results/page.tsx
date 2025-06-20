'use client'

import { useEffect, useState } from 'react'

type Result = {
    module?: string
    correct: boolean
    number: number
    date: string
}

export default function ExamResultsPage() {
    const [results, setResults] = useState<Result[]>([])

    useEffect(() => {
        const data = localStorage.getItem('exam_results')
        if (data) {
            setResults(JSON.parse(data))
        }
    }, [])

    return (
        <main style={{ padding: '2rem' }}>
            <h1>📋 Meine Prüfungen</h1>

            {results.length === 0 ? (
                <p>Es wurden noch keine Prüfungen gespeichert.</p>
            ) : (
                <ul>
                    {results.map((r, index) => (
                        <li key={index} style={{ marginBottom: '1.5rem' }}>
                            <strong>Fragenummer:</strong> {r.number}<br />
                            <strong>Ergebnis:</strong> {r.correct ? '✅ Richtig' : '❌ Falsch'}<br />
                            {r.date && (
                                <strong>Datum: {new Date(r.date).toLocaleString()}</strong>
                            )}

                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
