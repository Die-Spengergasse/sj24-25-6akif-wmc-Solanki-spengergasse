'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function NewTopicPage() {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [moduleGuid, setModuleGuid] = useState<string | undefined>('')

    
    const params = useParams()
    const router = useRouter() 

    useEffect(() => {
        
        if (params && params.moduleGuid) {
            setModuleGuid(Array.isArray(params.moduleGuid) ? params.moduleGuid[0] : params.moduleGuid)
        }
    }, [params])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            setError('Bitte einen gültigen Namen eingeben.')
            setSuccess('')
            return
        }

        const res = await fetch('http://localhost:5080/api/topics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                assignedModuleGuid: moduleGuid,
            }),
        })

        if (res.ok) {
            setSuccess('Thema erfolgreich hinzugefügt!')
            setError('')
        } else {
            setError('Fehler beim Hinzufügen des Themas.')
            setSuccess('')
        }
    }

    const handleBack = () => {
        
        if (moduleGuid) {
            router.push(`/modules/${moduleGuid}`)
        }
    }

    return (
        <div>
            <h1>Neues Thema hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Themenname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Thema hinzufügen</button>
            </form>
            <button onClick={handleBack}>Zurück zur Themenliste</button> {/* Zurück-Button */}
        </div>
    )
}
