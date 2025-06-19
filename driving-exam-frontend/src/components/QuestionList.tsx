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
    if (questions.length === 0) {
        return <p>Keine Fragen gefunden.</p>
    }

    return (
        <ul>
            {questions.map((q) => (
                <li key={q.guid} style={{ marginBottom: '2rem' }}>
                    <strong>Frage {q.number}</strong><br />
                    <p>{q.text}</p>
                    {q.imageUrl && <img src={q.imageUrl} alt="Fragebild" width={200} />}
                    <ul>
                        {q.answers.map((a) => (
                            <li key={a.guid}>{a.text}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}
