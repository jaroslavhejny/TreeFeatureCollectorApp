import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../src/api/uploadImage";
import { loadTokens } from "../src/auth/tokenStore";

export default function TakePhoto() {
    const [severity, setSeverity] = useState("3");
    const [description, setDescription] = useState("");

    const onTake = async () => {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
            Alert.alert("Chybí oprávnění", "Povol kameře přístup.");
            return;
        }

        const shot = await ImagePicker.launchCameraAsync({
            quality: 0.8,
        });

        if (shot.canceled) return;

        const { access_token } = await loadTokens();
        if (!access_token) {
            Alert.alert("Nejsi přihlášený");
            return;
        }

        try {
            const res = await uploadImage({
                accessToken: access_token,
                photoUri: shot.assets[0].uri,
                severity: Number(severity),
                description,
            });

            Alert.alert("OK", `Uloženo: ${res.id ?? "bez id"}`);
            setDescription("");
        } catch (e: any) {
            Alert.alert("Upload error", e?.message ?? "unknown");
        }
    };

    return (
        <View style={{ flex: 1, padding: 16, gap: 10 }}>
            <Text>Severity (1–5)</Text>
            <TextInput value={severity} onChangeText={setSeverity} keyboardType="number-pad" />

            <Text>Description</Text>
            <TextInput value={description} onChangeText={setDescription} placeholder="Popis…" />

            <Button title="Vyfotit a nahrát" onPress={onTake} />
        </View>
    );
}
