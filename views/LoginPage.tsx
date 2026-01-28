import React, {useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {supabase} from "../lib/supabase";


const LoginPage = () => {
    const [email, setEmail] = useState("user1@test.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const loginHandler = async () => {
        setError(null);
        setLoading(true);
        try {
            const {error} = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password
            })
            if (error) {
                setError(error.message)
            }
        } catch (error) {
            console.error('loginError', error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginHeader}>Login</Text>
            <TextInput placeholder={'email'} style={styles.input} keyboardType={'email-address'} value={email}
                       onChangeText={setEmail}/>
            <TextInput placeholder={'password'} secureTextEntry={true} style={styles.input} value={password}
                       onChangeText={setPassword}/>
            {error && <Text style={styles.errorMsg}>{error}</Text>}
            {loading ?
                <Text>Signing in...</Text> :
                <Button onPress={loginHandler} title={'Login'}/>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 150,
        rowGap: 6,
        paddingHorizontal: 20,
    },
    input: {
        fontSize: 20,
        padding: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        width: "100%",
        borderRadius: 10,
        textAlign: 'center',
    },
    errorMsg: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    loginHeader: {
        fontSize: 40,
        fontWeight: 'bold',
    },
});

export default LoginPage;