'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewModulePage() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const numberValue = parseInt(number)
        if (!name.trim() || isNaN(numberValue) || numberValue < 1 || numberValue > 999999) {
            setError('Bitte gültigen Namen und eine Zahl zwischen 1 und 999999 eingeben.')
            setSuccess('')
            return
        }

        const res = await fetch('http://localhost:5080/api/modules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, number: numberValue }),
        })

        if (res.ok) {
            setSuccess('Modul erfolgreich erstellt.')
            setError('')
            setName('')
            setNumber('')
            setTimeout(() => {
                router.push('/modules')
            }, 1500)
        } else {
            setError('Fehler: Diese Modulnummer ist ungültig oder bereits vergeben.')
            setSuccess('')
        }
    }

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Neues Modul erstellen</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Modulname:</label><br />
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '300px' }}
                /><br />
                <label htmlFor="number">Modulnummer:</label><br />
                <input
                    id="number"
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '300px' }}
                /><br />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>Speichern</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </main>
    )
}
