import { useQuery } from "@tanstack/react-query";
import { NasaApodResponse } from "@/types/apod";

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

async function fetchRandomAPODs(): Promise<NasaApodResponse[]> {
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=8`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch random APODs");
    }

    const data: NasaApodResponse[] = await response.json();

    // Optional: sort by date descending just to make it feel nicer
    return data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function useRandomAPODData() {
    return useQuery({
        queryKey: ["random-apod"],
        queryFn: fetchRandomAPODs,
        refetchOnWindowFocus: false,
        staleTime: Infinity, // keeps current random ones around unless refetch is triggered
    });
}
