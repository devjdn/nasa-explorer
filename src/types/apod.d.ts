/* NASA APOD - Astronomy Picture of the Day API */

export interface NasaApodResponse {
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: "image" | "video";
    service_version: string;
    title: string;
    url: string;
    copyright?: string;
}
