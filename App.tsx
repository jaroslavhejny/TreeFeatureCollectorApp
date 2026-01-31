import 'react-native-gesture-handler';
import React from "react"
import { View } from "react-native"
import { AuthProvider, useAuth } from "./src/auth/authContext"
import TreeApp from "./views/TreeApp"
import LoginPage from "./views/LoginPage"
import { enableScreens } from 'react-native-screens';

enableScreens();
const Root = ()=> {
    const { isAuth, loading } = useAuth()
    if (loading) return null

    return <View style={{ flex: 1 }}>{isAuth ? <TreeApp /> : <LoginPage />}</View>
}

const App = () => {
    return (
        <AuthProvider>
            <Root />
        </AuthProvider>
    )
}

export default App
