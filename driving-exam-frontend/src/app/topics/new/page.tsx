'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewTopicPage() {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (name.trim().length === 0) {
            setError('Bitte gib einen Namen ein.')
            setSuccess('')
            return
        }

        const res = await fetch('http://localhost:5080/api/topics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        })

        if (res.ok) {
            setSuccess('Neues Thema erfolgreich angelegt.')
            setError('')
            setName('')
            setTimeout(() => {
                router.push('/modules')
            }, 1500)
        } else {
            setError('Fehler beim Erstellen des Themas.')
            setSuccess('')
        }
    }

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Neues Thema erstellen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Themenname:</label><br />
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '300px' }}
                /><br />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Speichern</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </main>
    )
}
