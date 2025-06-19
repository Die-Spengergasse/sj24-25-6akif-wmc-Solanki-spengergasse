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
                <li key={modul.guid}>
                    <strong>{modul.name}</strong><br />
                    <small style={{ color: 'gray' }}>{modul.guid}</small>
                </li>
            ))}
        </ul>
    )
}
