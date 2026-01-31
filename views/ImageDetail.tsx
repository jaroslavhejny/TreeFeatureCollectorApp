import React, {useEffect, useState} from "react";
import {View, Text, Image, ActivityIndicator, ScrollView} from "react-native";
import {loadTokens} from "../src/auth/tokenStore";
import {apiGetImageDetail, type ImageRow} from "../src/api/getImage";

export default function ImageDetail({route}: any) {
    const {id} = route.params;
    const [item, setItem] = useState<ImageRow | null>(null);

    useEffect(() => {
        (async () => {
            const {access_token} = await loadTokens();
            if (!access_token) throw new Error("Not logged in");
            const data = await apiGetImageDetail(access_token, id);
            setItem(data);
        })();
    }, [id]);

    if (!item) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{padding: 16, gap: 12}}>
            <Image source={{uri: item.imageUrl}} style={{width: "100%", height: 360, borderRadius: 12}}/>
            <Text style={{fontSize: 18, fontWeight: "600"}}>Severity: {item.severity}</Text>
            <Text style={{fontSize: 16}}>{item.description || "— bez popisu —"}</Text>
            <Text style={{opacity: 0.7}}>{new Date(item.created_at).toLocaleString()}</Text>
        </ScrollView>
    );
}
