import React from "react"
import { Text, View } from "react-native"
import { useAuth } from "../src/auth/authContext"
import AppButton from "../src/components/Button";

 const TreeApp = () => {
    const { logout } = useAuth()

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <AppButton title="Logout" onPress={logout} />
            <Text>TreeApp</Text>
        </View>
    )
}

export default TreeApp;
