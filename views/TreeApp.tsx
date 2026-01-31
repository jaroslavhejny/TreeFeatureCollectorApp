import React from "react"
import {View, StyleSheet} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {NavigationContainer} from "@react-navigation/native"

import TakePhoto from "./TakePhoto"
import Profile from "./Profile";
import ListStack from "./ListStack";

const Tab = createBottomTabNavigator()

export default function TreeApp() {

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.body}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Seznam" component={ListStack}/>
                        <Tab.Screen name="Foto" component={TakePhoto}/>
                        <Tab.Screen name="Profile" component={Profile}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    body: {flex: 1},
})
