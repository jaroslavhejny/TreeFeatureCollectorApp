import React from "react"
import { View } from "react-native"
import { AuthProvider, useAuth } from "./src/auth/authContext"
import TreeApp from "./views/TreeApp"
import LoginPage from "./views/LoginPage"

function Root() {
    const { isAuth, loading } = useAuth()
    if (loading) return null

    return <View style={{ flex: 1 }}>{isAuth ? <TreeApp /> : <LoginPage />}</View>
}

export default function App() {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    )
}
