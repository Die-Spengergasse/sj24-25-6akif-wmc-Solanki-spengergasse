'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Topic = {
    guid: string
    name: string
}

type Props = {
    topics: Topic[]
}

export default function TopicList({ topics }: Props) {
    const pathname = usePathname()

    if (topics.length === 0) {
        return <p>Keine Themen gefunden.</p>
    }

    return (
        <ul>
            {topics.map((topic) => (
                <li key={topic.guid} style={{ marginBottom: '1rem' }}>
                    <Link href={`${pathname}/topics/${topic.guid}`}>
                        <strong>{topic.name}</strong>
                    </Link><br />
                    <small style={{ color: 'gray' }}>{topic.guid}</small>
                </li>
            ))}
        </ul>
    )
}
