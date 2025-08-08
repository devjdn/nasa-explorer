// types/mars.d.ts

// Shared types
export type RoverName = "Curiosity" | "Opportunity" | "Spirit";

export type RoverStatus = "active" | "complete";

export type CameraName =
    | "FHAZ"
    | "RHAZ"
    | "MAST"
    | "CHEMCAM"
    | "MAHLI"
    | "MARDI"
    | "NAVCAM"
    | "PANCAM"
    | "MINITES";

export interface Camera {
    id: number;
    name: CameraName;
    rover_id: number;
    full_name: string;
}

export interface Rover {
    id: number;
    name: RoverName;
    landing_date: string;
    launch_date: string;
    status: RoverStatus;
}

// 🖼️ Photo response (used for /rovers/{rover}/photos and /photos?earth_date=)
export interface MarsPhoto {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface MarsPhotosResponse {
    photos: MarsPhoto[];
}

// 📦 Manifest response (used for /manifests/{rover})
export interface ManifestPhotoEntry {
    sol: number;
    earth_date: string;
    total_photos: number;
    cameras: CameraName[];
}

export interface MarsManifest {
    name: RoverName;
    landing_date: string;
    launch_date: string;
    status: RoverStatus;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: ManifestPhotoEntry[];
}

export interface MarsManifestResponse {
    photo_manifest: MarsManifest;
}
