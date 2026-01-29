import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { apiLogin, apiLogout } from "../api/client"
import { clearTokens, loadTokens, saveTokens } from "./tokenStore"

type AuthState = {
    isAuth: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthState>(null as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const t = await loadTokens()
            setAccessToken(t.access_token)
            setRefreshToken(t.refresh_token)
            setLoading(false)
        })()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const res = await apiLogin(email, password)
            await saveTokens(res.access_token, res.refresh_token)
            setAccessToken(res.access_token)
            setRefreshToken(res.refresh_token)
        }
        catch (e) {
            console.error('login error', e);
        }

    }

    const logout = async () => {
        try {
            if (accessToken && refreshToken) {
                await apiLogout(accessToken, refreshToken)
            }
        } finally {
            await clearTokens()
            setAccessToken(null)
            setRefreshToken(null)
        }
    }

    const value = useMemo<AuthState>(() => ({
        isAuth: !!accessToken,
        loading,
        login,
        logout,
    }), [accessToken, loading])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}
