'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const authority = 'https://login.microsoftonline.com/c61e66aa-01c3-4775-a319-71a07f3c67a4'
const clientId = 'c2c20d42-e6b0-4da2-862b-631269249f88'
const redirectUri = 'http://localhost:3000'

export function useAuth() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const params = new URLSearchParams(hash.substring(1))
            const accessToken = params.get('access_token')
            const idToken = params.get('id_token')

            if (accessToken && idToken) {
                localStorage.setItem('access_token', accessToken)
                localStorage.setItem('id_token', idToken)
                router.replace('/')
            }
        }

        const savedId = localStorage.getItem('id_token')
        if (savedId) {
            try {
                const payload = JSON.parse(atob(savedId.split('.')[1]))
                setUser(payload)
            } catch { }
        }
    }, [router])

    function login() {
        const url = `${authority}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token id_token&redirect_uri=${redirectUri}&scope=openid profile email&response_mode=fragment&nonce=12345`
        window.location.href = url
    }

    function logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        setUser(null)
        router.push('/')
    }

    return { user, login, logout }
}
