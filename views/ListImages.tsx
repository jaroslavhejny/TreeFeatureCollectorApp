import React, {useEffect, useState} from "react";
import {View, FlatList, Image, Pressable, Text, ActivityIndicator, RefreshControl, StyleSheet} from "react-native";
import {loadTokens} from "../src/auth/tokenStore";
import {apiGetImages, type ImageRow} from "../src/api/getImage";
import SeverityBadge from "../src/components/SeverityBadge";

export default function ListImages({navigation}: any) {
    const [items, setItems] = useState<ImageRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = async () => {
        const {access_token} = await loadTokens();
        if (!access_token) throw new Error("Not logged in");
        const data = await apiGetImages(access_token);
        setItems(data);
    };

    useEffect(() => {
        (async () => {
            try {
                await load();
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await load();
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <FlatList
            data={items}
            keyExtractor={(x) => x.id}
            numColumns={3}
            contentContainerStyle={{padding: 8}}
            columnWrapperStyle={{gap: 8}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            ListEmptyComponent={
                <View style={styles.emptyComponent}>
                    <Text style={styles.emptyComponentText}>
                        No images found.
                    </Text>
                </View>
            }
            renderItem={({item}) => (
                <Pressable
                    style={styles.pressable}
                    onPress={() => navigation.navigate("ImageDetail", {id: item.id})}
                >
                    <Image
                        source={{uri: item.imageUrl}}
                        style={styles.image}
                    />
                    <View style={styles.severity}>
                        <SeverityBadge severity={item.severity} size={12}/>
                    </View>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    severity: {position: "absolute", bottom: 6, left: 6},
    pressable: {flex: 1, aspectRatio: 1, marginBottom: 8},
    emptyComponent: {flex: 1, justifyContent: "center", alignItems: "center", padding: 24},
    loading: {flex: 1, justifyContent: "center", alignItems: "center"},
    emptyComponentText: {opacity: 0.7, textAlign: "center"},
    image: {width: "100%", height: "100%", borderRadius: 8}
})
