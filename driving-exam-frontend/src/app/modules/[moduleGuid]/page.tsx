import BackButton from '@/components/BackButton'
import TopicList from '@/components/TopicList'
import Link from 'next/link'

type Topic = {
    guid: string
    name: string
    moduleGuid: string
}

export default async function TopicsPage({ params }: { params: { moduleGuid: string } }) {
    // Asynchrone Verarbeitung von params
    const { moduleGuid } = await params 

    // Warten auf die Antwort von fetch
    const res = await fetch(`http://localhost:5080/api/topics?assignedModule=${moduleGuid}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        return (
            <main style={{ padding: '1rem' }}>
                <BackButton to="/modules" />
                <h2 style={{ color: 'red' }}>⚠️ Fehler beim Laden der Topics</h2>
                <p>Das Modul konnte nicht gefunden werden oder enthält keine Themen.</p>
            </main>
        )
    }

    
    const topics: Topic[] = await res.json()

    return (
        <main style={{ padding: '1rem' }}>
            <BackButton to="/modules" />
            <h1>Themen zum Modul</h1>
            <TopicList topics={topics} />

            {/* Buttons unten anzeigen */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Link href={`/exam/${moduleGuid}`}>
                    <button style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        📝 Prüfung starten
                    </button>
                </Link>

                <Link href={`/modules/${moduleGuid}/topics/new`}>
                    <button style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'orange',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        ➕ Thema hinzufügen
                    </button>
                </Link>
            </div>
        </main>
    )
}
