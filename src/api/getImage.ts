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
    const r = await fetch(`${API_URL}/images`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await parseJson(r);
    if (!r.ok) throw new Error(data?.error ?? `HTTP ${r.status}`);
    return data as ImageRow[];
}

export async function apiGetImageDetail(accessToken: string, id: string): Promise<ImageRow> {
    const r = await fetch(`${API_URL}/images/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await parseJson(r);
    if (!r.ok) throw new Error(data?.error ?? `HTTP ${r.status}`);
    return data as ImageRow;
}
