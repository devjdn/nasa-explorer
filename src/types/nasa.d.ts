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

/* Mars Rover Photos API */

export interface MarsPhoto {
    id: number;
    sol: number;
    camera: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
        id: number;
        name: string;
        landing_date: string;
        launch_date: string;
        status: "active" | "complete";
    };
}

export interface MarsRoverPhotosResponse {
    photos: MarsPhoto[];
}

/* NASA Image and Video Library API */

export interface NasaImageSearchResponse {
    collection: {
        version: string;
        href: string;
        items: NasaImageItem[];
        metadata: {
            total_hits: number;
        };
        links?: {
            rel: string;
            prompt: string;
            href: string;
        }[];
    };
}

export interface NasaImageItem {
    href: string;
    data: {
        center: string;
        title: string;
        nasa_id: string;
        media_type: "image" | "video" | "audio";
        keywords?: string[];
        date_created: string;
        description?: string;
    }[];
    links?: {
        href: string;
        rel: string;
        render: string;
    }[];
}

/*  NeoWs - Near Earth Object Web Service API */

export interface NeoFeedResponse {
    links: {
        next: string;
        prev: string;
        self: string;
    };
    element_count: number;
    near_earth_objects: {
        [date: string]: NearEarthObject[];
    };
}

export interface NearEarthObject {
    id: string;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: DiameterRange;
        meters: DiameterRange;
        miles: DiameterRange;
        feet: DiameterRange;
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproach[];
    is_sentry_object: boolean;
}

export interface DiameterRange {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface CloseApproach {
    close_approach_date: string;
    relative_velocity: {
        kilometers_per_second: string;
        kilometers_per_hour: string;
        miles_per_hour: string;
    };
    miss_distance: {
        astronomical: string;
        lunar: string;
        kilometers: string;
        miles: string;
    };
    orbiting_body: string;
}
