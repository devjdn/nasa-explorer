import type { NasaApodResponse } from "@/types/nasa";
import Image from "next/image";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Camera,
    ExternalLink,
    X,
    ImageIcon,
    VideoIcon,
    Copyright,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function APODHeroDialog({ image }: { image: NasaApodResponse }) {
    return (
        <div className="relative group overflow-hidden rounded-2xl h-[75vh] md:h-[unset] md:aspect-video">
            {image.media_type === "image" ? (
                <Image
                    src={image.hdurl || image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                />
            ) : (
                <iframe
                    src={image.url}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 line-clamp-2">
                    {image.title}
                </h2>
                <div className="flex items-center flex-wrap gap-2">
                    <Badge variant="secondary">
                        {image.media_type === "image" ? (
                            <>
                                <ImageIcon />
                                <span>Image</span>
                            </>
                        ) : (
                            <>
                                <VideoIcon />
                                <span>Video</span>
                            </>
                        )}
                    </Badge>
                    <Badge variant={"secondary"}>
                        <Calendar />
                        <span>
                            {new Date(image.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </Badge>
                    {image.copyright && (
                        <Badge variant={"secondary"}>
                            <Copyright />
                            <span>{image.copyright}</span>
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
}
