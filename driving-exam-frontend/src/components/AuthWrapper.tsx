'use client'
import { useAuth } from '@/auth'

type UserInfo = {
    name?: string
    preferred_username?: string
    email?: string
    unique_name?: string
}

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { user, login, logout } = useAuth()

    const safeUser = user as UserInfo | null

    let displayName = 'Benutzer'
    if (safeUser) {
        displayName =
            safeUser.name ??
            safeUser.preferred_username ??
            safeUser.email ??
            safeUser.unique_name ??
            'Benutzer'
    }

    return (
        <>
            <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                {safeUser ? (
                    <>
                        <span style={{ marginRight: '1rem' }}>👤 {displayName}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <button onClick={login}>Login</button>
                )}
            </div>
            {children}
        </>
    )
}
