'use client'
import Link from 'next/link'

type Module = {
    guid: string
    name: string
}

type Props = {
    modules: Module[]
}

export default function ModuleList({ modules }: Props) {
    return (
        <ul>
            {modules.map((modul) => (
                <li key={modul.guid} style={{ marginBottom: '1rem' }}>
                    <Link href={`/modules/${modul.guid}`}>
                        <strong>{modul.name}</strong>
                    </Link><br />
                    <small style={{ color: 'gray' }}>{modul.guid}</small>
                </li>
            ))}
        </ul>
    )
}
