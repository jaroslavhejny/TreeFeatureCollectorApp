import React from "react"
import { View, StyleSheet } from "react-native"
import AppButton from "../src/components/AppButton";
import {useAuth} from "../src/auth/authContext";

export default function Profile() {
    const {logout} = useAuth()

    return (
        <View style={styles.wrapper}>
            <AppButton title="Logout" onPress={logout} size="small"/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, justifyContent: "center", alignItems: "center" }
})
