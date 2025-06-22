'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CreateTopicPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const moduleGuid = searchParams.get('module') || ''

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        console.log('Modul-GUID aus URL:', moduleGuid)
    }, [moduleGuid])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Bitte einen gültigen Themennamen eingeben.')
            return
        }

        if (!moduleGuid) {
            setError('Fehlende Modul-GUID – Thema kann nicht gespeichert werden.')
            return
        }

        const res = await fetch('http://localhost:5080/api/topics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                assignedModuleGuid: moduleGuid
            }),
        })

        if (res.ok) {
            setSuccess('Thema erfolgreich erstellt.')
            setTimeout(() => {
                router.push(`/modules/${moduleGuid}`)
                router.refresh()
            }, 1000)
        } else {
            setError('Fehler beim Erstellen des Themas.')
        }
    }

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Neues Thema anlegen</h1>
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
