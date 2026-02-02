export const API_URL = process.env.EXPO_PUBLIC_API_URL!;

type LoginResponse = {
    access_token: string
    refresh_token: string
    expires_at?: number
    user?: any
}

export const apiLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const r = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    const data = await r.json().catch(() => ({}))

    if (!r.ok) throw new Error(data?.error ?? "Login failed")
    return data as LoginResponse
}

export const apiLogout = async (access_token: string, refresh_token: string): Promise<void> => {
    const r = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, refresh_token }),
    })


    if (!r.ok && r.status !== 204) {
        const data = await r.json().catch(() => ({}))
        throw new Error(data?.error ?? "Logout failed")
    }
}
