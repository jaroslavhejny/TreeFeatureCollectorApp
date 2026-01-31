import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Pressable, Text, ActivityIndicator, RefreshControl } from "react-native";
import { loadTokens } from "../src/auth/tokenStore";
import { apiGetImages, type ImageRow } from "../src/api/getImage";

export default function ListImages({ navigation }: any) {
    const [items, setItems] = useState<ImageRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = async () => {
        const { access_token } = await loadTokens();
        if (!access_token) throw new Error("Not logged in");
        const data = await apiGetImages(access_token);
        setItems(data);
    };

    useEffect(() => {
        (async () => {
            try { await load(); }
            finally { setLoading(false); }
        })();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try { await load(); }
        finally { setRefreshing(false); }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(x) => x.id}
            numColumns={3}
            contentContainerStyle={{ padding: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
                    <Text style={{ opacity: 0.7, textAlign: "center" }}>
                        No images found.
                    </Text>
                </View>
            }
            renderItem={({ item }) => (
                <Pressable
                    style={{ flex: 1, aspectRatio: 1, marginBottom: 8 }}
                    onPress={() => navigation.navigate("ImageDetail", { id: item.id })}
                >
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    />
                    <View style={{ position: "absolute", bottom: 6, left: 6, backgroundColor: "rgba(0,0,0,0.45)", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 }}>
                        <Text style={{ color: "white", fontSize: 12 }}>S{item.severity}</Text>
                    </View>
                </Pressable>
            )}
        />
    );
}
