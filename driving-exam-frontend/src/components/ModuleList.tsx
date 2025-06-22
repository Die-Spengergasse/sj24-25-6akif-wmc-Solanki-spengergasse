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
                <li key={modul.guid} style={{ marginBottom: '2rem' }}>
                    <strong>{modul.name}</strong><br />
                    <small style={{ color: 'gray' }}>{modul.guid}</small><br />
                    <Link href={`/modules/${modul.guid}`}>
                        <button style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>
                            Themen anzeigen
                        </button>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
