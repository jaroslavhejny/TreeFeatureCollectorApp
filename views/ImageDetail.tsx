import React, {useEffect, useState} from "react";
import {View, Text, Image, ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import {loadTokens} from "../src/auth/tokenStore";
import {apiGetImageDetail, type ImageRow} from "../src/api/getImage";
import SeverityBadge from "../src/components/SeverityBadge";

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
            <View style={styles.emptyItem}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{padding: 16, gap: 12}}>
            <Image source={{uri: item.imageUrl}} style={styles.image}/>
            <SeverityBadge severity={item.severity} size={18}/>
            <Text style={styles.description}>{item.description || "no description"}</Text>
            <Text style={styles.created_at}>{new Date(item.created_at).toLocaleString()}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    emptyItem: {flex: 1, justifyContent: "center", alignItems: "center"},
    image: {width: "100%", height: 360, borderRadius: 12},
    description: {fontSize: 16},
    created_at: {opacity: 0.7}
})
