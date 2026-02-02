import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {arboColors} from "../../theme/theme";

type Props = {
    severity: number;
    size?: number;
};

const COLORS: Record<number, string> = {
    1: arboColors.severity_1,
    2: arboColors.severity_2,
    3: arboColors.severity_3,
    4: arboColors.severity_4,
    5: arboColors.severity_5,
};

export default function SeverityBadge({ severity = 3, size = 24 }: Props) {
    const color = COLORS[severity];

    return (
        <View
            style={[
                styles.circle,
                {
                    backgroundColor: color,
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            <Text style={[styles.text, { fontSize: size * 0.5 }]}>
                {severity}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontWeight: "700",
    },
});
