import ModuleList from '@/components/ModuleList'

type Module = {
    guid: string
    name: string
}

export default async function ModulesPage() {
    const res = await fetch('http://localhost:5080/api/modules', {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Fehler beim Laden der Module')
    }

    const modules: Module[] = await res.json()

    return (
        <main style={{ padding: '1rem' }}>
            <h1>Module</h1>
            <ModuleList modules={modules} />
        </main>
    )
}
