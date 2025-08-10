import { NasaApodResponse } from "@/types/apod";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const BASE_URL = "https://api.nasa.gov";

type FetchApodOptions = {
    date?: string;
    range?: { startDate: string; endDate: string };
};

type NasaApodArray = NasaApodResponse[];

export async function fetchApod(
    options?: FetchApodOptions
): Promise<NasaApodResponse | NasaApodArray> {
    const dateQuery = options?.date ? `&date=${options.date}` : "";
    const rangeQuery = options?.range
        ? `&start_date=${options.range.startDate}&end_date=${options.range.endDate}`
        : "";
    const res = await fetch(
        `${BASE_URL}/planetary/apod?api_key=${API_KEY}${dateQuery}${rangeQuery}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error(`NASA APOD fetch failed: ${res.statusText}`);
    }

    const data: NasaApodResponse | NasaApodArray = await res.json();
    return data;
}
