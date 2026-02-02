import {API_URL} from "./client";

export type ImageRow = {
    id: string;
    severity: number;
    description: string | null;
    created_at: string;
    imageUrl: string;
};

async function parseJson(r: Response) {
    const text = await r.text();
    try { return text ? JSON.parse(text) : {}; } catch { return {}; }
}

export async function apiGetImages(accessToken: string): Promise<ImageRow[]> {
    const response = await fetch(`${API_URL}/images`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await parseJson(response);
    if (!response.ok) throw new Error(data?.error ?? `HTTP ${response.status}`);
    return data as ImageRow[];
}

export async function apiGetImageDetail(accessToken: string, id: string): Promise<ImageRow> {
    const response = await fetch(`${API_URL}/images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await parseJson(response);
    if (!response.ok) throw new Error(data?.error ?? `HTTP ${response.status}`);
    return data as ImageRow;
}
