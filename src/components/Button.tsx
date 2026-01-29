import React from "react";
import {Button, ButtonProps, StyleSheet, View} from "react-native";
import {arboColors} from "../../theme/theme";

const AppButton = (props: ButtonProps) => {
    return (
        <View style={styles.container}>
            <Button {...props} color={arboColors.white}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: arboColors.greenStatic,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
})

export default AppButton;