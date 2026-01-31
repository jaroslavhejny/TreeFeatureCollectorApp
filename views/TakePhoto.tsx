import React, { useState } from "react";
import { View, Text, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../src/components/AppButton";
import { loadTokens } from "../src/auth/tokenStore";
import { uploadImage } from "../src/api/uploadImage";

export default function TakePhoto() {
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [severity, setSeverity] = useState("3");
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const takePhoto = async () => {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
            Alert.alert("Chybí oprávnění", "Povol kameře přístup.");
            return;
        }

        const shot = await ImagePicker.launchCameraAsync({
            quality: 0.85,
        });

        if (shot.canceled) return;
        setPhotoUri(shot.assets[0].uri);
    };

    const pickFromGallery = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
            Alert.alert("Chybí oprávnění", "Povol přístup k fotkám.");
            return;
        }

        const pick = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.85,
        });

        if (pick.canceled) return;
        setPhotoUri(pick.assets[0].uri);
    };

    const reset = () => {
        setPhotoUri(null);
        setSeverity("3");
        setDescription("");
    };

    const submit = async () => {
        if (!photoUri) return;

        const sev = Number(severity);
        if (!Number.isInteger(sev) || sev < 1 || sev > 5) {
            Alert.alert("Chyba", "Severity musí být číslo 1–5.");
            return;
        }

        const { access_token } = await loadTokens();
        if (!access_token) {
            Alert.alert("Nejsi přihlášený");
            return;
        }

        try {
            setUploading(true);
            await uploadImage({
                accessToken: access_token,
                photoUri,
                severity: sev,
                description,
            });
            Alert.alert("OK", "Nahráno.");
            reset();
        } catch (e: any) {
            Alert.alert("Upload error", e?.message ?? "unknown");
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16, gap: 12 }}>
            {!photoUri ? (
                <>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Take photo</Text>

                    <AppButton title="Take photo" onPress={takePhoto} />
                    <AppButton title="Choose from gallery" onPress={pickFromGallery} />
                </>
            ) : (
                <>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>Nový záznam</Text>

                    <Image
                        source={{ uri: photoUri }}
                        style={{ width: "100%", height: 260, borderRadius: 12 }}
                    />

                    <Text>Severity (1–5)</Text>
                    <TextInput
                        value={severity}
                        onChangeText={setSeverity}
                        keyboardType="number-pad"
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />

                    <Text>Popis</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Např. dutina, dřevokazné houby, poškozená kůra, ulomené větve, ..."
                        style={{ borderWidth: 1, borderRadius: 8, padding: 10 }}
                    />

                    {uploading ? (
                        <View style={{ alignItems: "center", paddingTop: 8 }}>
                            <ActivityIndicator />
                            <Text style={{ marginTop: 6, opacity: 0.7 }}>Uploading...</Text>
                        </View>
                    ) : (
                        <>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <AppButton title="Change photo" onPress={takePhoto} size="small" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <AppButton title="Cancel" onPress={reset} size="small" />
                                </View>
                            </View>

                            <AppButton title="Send" onPress={submit} />
                        </>
                    )}
                </>
            )}
        </View>
    );
}
