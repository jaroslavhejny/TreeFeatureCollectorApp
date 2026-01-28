import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {supabase} from "../lib/supabase";

const TreeApp = () => {
    const logout = async () => {
        console.log("logout");
        const response = await supabase.auth.signOut();
    }
    return (
        <View style={styles.container}>
            <Button title={'Logout'} onPress={logout}></Button>
            <Text>TreeApp</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default TreeApp;