import React from "react"
import { Button, Text, View } from "react-native"
import { useAuth } from "../src/auth/authContext"

export default function TreeApp() {
    const { logout } = useAuth()

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Logout" onPress={logout} />
            <Text>TreeApp</Text>
        </View>
    )
}
