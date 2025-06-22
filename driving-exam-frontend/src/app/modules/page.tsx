import ModuleList from '@/components/ModuleList'
import BackButton from '@/components/BackButton'

type Module = {
    guid: string
    name: string
}

export default async function ModulesPage() {
    const res = await fetch('http://localhost:5080/api/modules', {
        cache: 'no-store',
    })

    if (!res.ok) {
        return (
            <main style={{ padding: '1rem' }}>
                <BackButton to="/" />
                <h2 style={{ color: 'red' }}>⚠️ Fehler beim Laden der Module</h2>
                <p>Die Module konnten nicht geladen werden. Stelle sicher, dass das Backend läuft.</p>
            </main>
        )
    }

    const modules: Module[] = await res.json()

    return (
        <main style={{ padding: '1rem' }}>
            <BackButton to="/" />
            <h1>Module</h1>
            <ModuleList modules={modules} />
        </main>
    )
}
