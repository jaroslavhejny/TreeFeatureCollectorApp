import React, {createContext, useContext, useEffect, useMemo, useState} from "react"
import {clearTokens, loadTokens, saveTokens} from "./tokenStore";
import {apiLogin, apiLogout} from "../api/client";

type AuthState = {
    isAuth: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)

    useEffect(() => {
        const auth = async () => {
            const t = await loadTokens()
            setAccessToken(t.access_token)
            setRefreshToken(t.refresh_token)
            setLoading(false)
        }
        auth();
    }, [])

    const login = async (email: string, password: string) => {
        const res = await apiLogin(email, password)
        await saveTokens(res.access_token, res.refresh_token)
        setAccessToken(res.access_token)
        setRefreshToken(res.refresh_token)
    }

    const logout = async () => {
        try {
            if (accessToken && refreshToken) await apiLogout(accessToken, refreshToken)
        } finally {
            await clearTokens()
            setAccessToken(null)
            setRefreshToken(null)
        }
    }

    const value = useMemo<AuthState>(
        () => ({isAuth: !!accessToken, loading, login, logout}),
        [accessToken, loading]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>")
    return ctx
}
