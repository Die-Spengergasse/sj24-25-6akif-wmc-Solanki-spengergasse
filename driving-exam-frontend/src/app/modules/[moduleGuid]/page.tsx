import TopicList from '@/components/TopicList'

type Topic = {
    guid: string
    name: string
}

type Params = {
    params: {
        moduleGuid: string
    }
}

export default async function TopicPage({ params }: Params) {
    const { moduleGuid } = params

    const res = await fetch(`http://localhost:5080/api/topics?assignedModule=${moduleGuid}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Fehler beim Laden der Topics')
    }

    const topics: Topic[] = await res.json()

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Themen zum Modul</h1>
            <p><small>{moduleGuid}</small></p>
            <TopicList topics={topics} />
        </main>
    )
}
