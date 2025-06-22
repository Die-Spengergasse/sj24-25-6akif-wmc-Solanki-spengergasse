'use client'

import { useRouter } from 'next/navigation'

export default function BackButton({ to }: { to: string }) {
    const router = useRouter()

    return (
        <button
            onClick={() => router.push(to)}
            style={{
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#545454',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            ⬅️ Zurück
        </button>
    )
}
