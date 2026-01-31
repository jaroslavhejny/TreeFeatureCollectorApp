import React from "react"
import { View } from "react-native"
import AppButton from "../src/components/AppButton";
import {useAuth} from "../src/auth/authContext";

export default function Profile() {
    const {logout} = useAuth()

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <AppButton title="Logout" onPress={logout} size="small"/>
        </View>
    )
}
