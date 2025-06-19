import QuestionList from '@/components/QuestionList'

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

export default async function QuestionPage({
    params,
}: {
    params: { moduleGuid: string; topicGuid: string }
}) {
    const { moduleGuid, topicGuid } = params

    const res = await fetch(
        `http://localhost:5080/api/questions?moduleGuid=${moduleGuid}&topicGuid=${topicGuid}`,
        { cache: 'no-store' }
    )

    if (!res.ok) {
        throw new Error('Fehler beim Laden der Fragen')
    }

    const questions: Question[] = await res.json()

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Fragen zum Thema</h1>
            <QuestionList questions={questions} />
        </main>
    )
}
