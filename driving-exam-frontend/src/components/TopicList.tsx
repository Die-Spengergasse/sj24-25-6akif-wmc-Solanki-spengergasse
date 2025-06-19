type Topic = {
    guid: string
    name: string
}

type Props = {
    topics: Topic[]
}

export default function TopicList({ topics }: Props) {
    if (topics.length === 0) {
        return <p>Keine Themen gefunden.</p>
    }

    return (
        <ul>
            {topics.map((topic) => (
                <li key={topic.guid}>
                    <strong>{topic.name}</strong><br />
                    <small style={{ color: 'gray' }}>{topic.guid}</small>
                </li>
            ))}
        </ul>
    )
}
