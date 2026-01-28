import {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TreeApp from "./views/TreeApp";
import LoginPage from "./views/LoginPage";
import {supabase} from "./lib/supabase";

export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setIsAuth(!!data.session);
        })

        const {data: subscription} = supabase.auth.onAuthStateChange((_, session)=>{
            setIsAuth(!!session);
        })

        return () => subscription.subscription.unsubscribe();
    }, [])

    return (
        <View style={styles.container}>
            {isAuth ? <TreeApp /> : <LoginPage />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
