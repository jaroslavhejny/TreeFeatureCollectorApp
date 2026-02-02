import React from "react";
import {Button, ButtonProps, StyleSheet, View} from "react-native";
import {arboColors} from "../../theme/theme";

interface AppButtonProps extends ButtonProps {
    size?: "small" | "medium" | "large";
}

const AppButton = ({size = 'medium', ...props}: AppButtonProps) => {
    const buttonStyle = styles[size]
    return (
        <View style={buttonStyle}>
            <Button {...props} color={arboColors.white}/>
        </View>
    )
}

const styles = StyleSheet.create({
    small: {
        backgroundColor: arboColors.greenStatic,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
    },
    medium: {
        backgroundColor: arboColors.greenStatic,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    large: {
        backgroundColor: arboColors.greenStatic,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
    },
})

export default AppButton;