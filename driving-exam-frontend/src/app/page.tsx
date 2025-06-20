'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🚗 Führerscheinprüfung – Übersicht</h1>
      <p style={{ marginBottom: '2rem' }}>
        Wähle einen Bereich:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <button onClick={() => router.push('/modules')}>📚 Module anzeigen</button>
        <button onClick={() => router.push('/modules/new')}>➕ Modul anlegen</button>
        <button onClick={() => router.push('/topics/new')}>➕ Thema anlegen</button>
        <button onClick={() => router.push('/exam/results')}>📋 Meine Prüfungen anzeigen</button>
      </div>
    </main>
  )
}
