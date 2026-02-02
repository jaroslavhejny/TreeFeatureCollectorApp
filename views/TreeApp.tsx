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
                        <Tab.Screen name="Photos" component={ListStack}/>
                        <Tab.Screen name="Take Photo" component={TakePhoto}/>
                        <Tab.Screen name="Profile" component={Profile}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    body: {flex: 1},
})
