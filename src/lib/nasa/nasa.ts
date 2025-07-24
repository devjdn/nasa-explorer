import { NasaApodResponse } from "@/types/nasa";

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov";

export async function fetchApod(): Promise<NasaApodResponse> {
    const res = await fetch(
        `${BASE_URL}/planetary/apod?api_key=${API_KEY}&date=2024-12-25`
    );

    if (!res.ok) {
        throw new Error(`NASA APOD fetch failed: ${res.statusText}`);
    }

    const data: NasaApodResponse = await res.json();
    return data;
}
