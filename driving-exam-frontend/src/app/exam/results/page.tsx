'use client'

import { useEffect, useState } from 'react'
import BackButton from '@/components/BackButton'


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
            const parsedResults = JSON.parse(data)
            parsedResults.sort((a: Result, b: Result) => new Date(b.date).getTime() - new Date(a.date).getTime())
            setResults(parsedResults)
        }
    }, [])

    const chunkResults = (arr: Result[], size: number): Result[][] => {
        const chunks: Result[][] = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }

    const groupedResults = chunkResults(results, 20)

    return (
        <main style={{ padding: '2rem' }}>
            <BackButton to="/" />
            <h1>📋 Meine Prüfungen</h1>

            {results.length === 0 ? (
                <p>Es wurden noch keine Prüfungen gespeichert.</p>
            ) : (
                groupedResults.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <ul>
                            {group.map((r, i) => (
                                <li key={i} style={{ marginBottom: '1.5rem' }}>
                                    <strong>Fragenummer:</strong> {r.number}<br />
                                    <strong>Ergebnis:</strong> {r.correct ? '✅ Richtig' : '❌ Falsch'}<br />
                                    <strong>Datum:</strong> {new Date(r.date).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                        {/* Linie nach jeder Gruppe außer der letzten */}
                        {groupIndex < groupedResults.length - 1 && (
                            <hr style={{ border: '1px solid #ccc', margin: '2rem 0' }} />
                        )}
                    </div>
                ))
            )}
        </main>
    )
}
