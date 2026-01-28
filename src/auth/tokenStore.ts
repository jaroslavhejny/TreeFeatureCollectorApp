import * as SecureStore from "expo-secure-store"

const ACCESS = "access_token"
const REFRESH = "refresh_token"

export async function saveTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync(ACCESS, accessToken)
    await SecureStore.setItemAsync(REFRESH, refreshToken)
}

export async function loadTokens() {
    const access_token = await SecureStore.getItemAsync(ACCESS)
    const refresh_token = await SecureStore.getItemAsync(REFRESH)
    return { access_token, refresh_token }
}

export async function clearTokens() {
    await SecureStore.deleteItemAsync(ACCESS)
    await SecureStore.deleteItemAsync(REFRESH)
}
