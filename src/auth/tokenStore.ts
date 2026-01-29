import * as SecureStore from "expo-secure-store"

const ACCESS = "access_token"
const REFRESH = "refresh_token"

export const saveTokens = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS, accessToken)
    await SecureStore.setItemAsync(REFRESH, refreshToken)
}

export const loadTokens = async () => {
    const access_token = await SecureStore.getItemAsync(ACCESS)
    const refresh_token = await SecureStore.getItemAsync(REFRESH)
    return { access_token, refresh_token }
}

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS)
    await SecureStore.deleteItemAsync(REFRESH)
}
