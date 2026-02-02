import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useAuth } from "../src/auth/authContext"
import AppButton from "../src/components/AppButton";

const LoginPage = ()=> {
    const { login } = useAuth()
    const [email, setEmail] = useState("user1@test.com")
    const [password, setPassword] = useState("heslo")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        setError(null)
        try {
            await login(email, password)
        } catch (e: any) {
            setError(e.message ?? "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={{ flex: 1 }} />

            <View style={styles.form}>
                <TextInput
                    placeholder="email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <AppButton title={loading ? "Logging in..." : "Login"} onPress={onSubmit} disabled={loading} />
            </View>

            <View style={{ flex: 1 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    title: { marginTop: 24, fontSize: 28, fontWeight: "600", textAlign: "center" },
    form: { rowGap: 8 },
    input: { width: "100%", fontSize: 18, padding: 10, borderWidth: 1, borderRadius: 8 },
    error: { marginTop: 4 },
})

export default LoginPage
