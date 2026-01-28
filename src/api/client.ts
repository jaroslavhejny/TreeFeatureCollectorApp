const PORT = 1208;
const LAN_ADDRESS = '10.0.1.45:1208'
const API_URL =`${LAN_ADDRESS}:${PORT}`

type LoginResponse = {
    access_token: string
    refresh_token: string
    expires_at?: number
    user?: any
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
    const r = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    const data = await r.json().catch(() => ({}))

    if (!r.ok) throw new Error(data?.error ?? "Login failed")
    return data as LoginResponse
}

export async function apiLogout(access_token: string, refresh_token: string): Promise<void> {
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
