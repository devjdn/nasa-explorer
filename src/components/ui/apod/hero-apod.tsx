import type { NasaApodResponse } from "@/types/apod";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, ImageIcon, VideoIcon, Copyright } from "lucide-react";

export default function APODHero({ image }: { image: NasaApodResponse }) {
    return (
        <div className="relative group overflow-hidden h-[75vh] md:h-[85vh] w-full md:aspect-video">
            {image.media_type === "image" ? (
                <Image
                    src={image.hdurl || image.url}
                    alt={image.title}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <iframe src={image.url} className="h-full w-full" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2 line-clamp-2">
                    {image.title}
                </h1>
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
