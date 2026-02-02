import {API_URL} from "./client";

export async function uploadImage(params: {
    accessToken: string;
    photoUri: string;
    severity: number;
    description: string;
}) {
    const form = new FormData();
    form.append("severity", String(params.severity));
    form.append("description", params.description);

    form.append("photo", {
        uri: params.photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);

    const r = await fetch(`${API_URL}/images`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${params.accessToken}`,
        },
        body: form,
    });

    const text = await r.text();
    let data: any = {};
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
    }

    if (!r.ok) throw new Error(data?.error ?? `HTTP ${r.status}`);
    return data;
}
