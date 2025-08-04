import { NasaApodResponse } from "@/types/nasa";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov";

export async function fetchApod(date?: string): Promise<NasaApodResponse> {
    const query = date ? `&date=${date}` : "";
    const res = await fetch(
        `${BASE_URL}/planetary/apod?api_key=${API_KEY}${query}`
    );

    if (!res.ok) {
        throw new Error(`NASA APOD fetch failed: ${res.statusText}`);
    }

    const data: NasaApodResponse = await res.json();
    return data;
}
