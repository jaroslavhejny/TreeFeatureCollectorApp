import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {supabase} from "../lib/supabase";
import {arboColors} from "../theme/theme";

const TreeApp = () => {
    const logout = async () => {
        console.log("logout");
        const response = await supabase.auth.signOut();
    }
    return (
            <SafeAreaView style={styles.safe} edges={['top']}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button title={'Logout'} onPress={logout}></Button>
                    </View>
                    <View style={styles.content}>
                        <Text>TreeApp</Text>
                    </View>
                </View>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safe: {
        flex: 1,
    },
    header: {
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: arboColors.greenStatic,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TreeApp;