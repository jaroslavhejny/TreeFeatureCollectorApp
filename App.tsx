import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={[styles.count, count >= 5 && styles.highlight]}>
                {count}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onLongPress={() => setCount(count + 10)}

                onPress={() => setCount(c => c + 1)}
            >
                <Text style={styles.buttonText}>+1</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    count: {
        fontSize: 48,
        marginBottom: 20,
    },
    highlight: {
        color: 'tomato',
        fontWeight: '700',
    },
    button: {
        backgroundColor: '#222',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
