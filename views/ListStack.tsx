import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListImages from "./ListImages";
import ImageDetail from "./ImageDetail";

const Stack = createNativeStackNavigator();

export default function ListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Gallery" component={ListImages} options={{ title: "All photos" }} />
            <Stack.Screen name="ImageDetail" component={ImageDetail} options={{ title: "Detail" }} />
        </Stack.Navigator>
    );
}
