"use client";

import type { NasaApodResponse } from "@/types/apod";
import Image from "next/image";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function APODMedia({ media }: { media: NasaApodResponse }) {
    return media.media_type === "image" ? (
        <Dialog>
            <DialogTrigger className="w-full">
                <div className="relative group">
                    <div className="relative inset-0 w-full max-h-[80vh] overflow-hidden">
                        <Image
                            src={media.url}
                            alt={media.title}
                            height={800}
                            width={500}
                            className="w-full h-auto max-h-[80vh] object-contain"
                            priority
                        />
                    </div>
                    <div className="h-full w-full absolute top-0 left-0 bg-transparent group-hover:bg-background/30 group-hover:cursor-pointer transition-colors duration-200"></div>
                </div>
            </DialogTrigger>
            <DialogContent className="w-screen h-screen rounded-none border-none p-0 grid place-items-center">
                <VisuallyHidden>
                    <DialogTitle>{media.title} in fullscreen view</DialogTitle>
                </VisuallyHidden>
                <div className="relative flex items-center justify-center">
                    <Image
                        src={media.hdurl || media.url}
                        alt={media.title}
                        height={0}
                        width={0}
                        sizes="95vw"
                        className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain"
                        priority
                        placeholder="blur"
                        blurDataURL={media.url}
                    />
                </div>
            </DialogContent>
        </Dialog>
    ) : (
        <div className="relative w-full aspect-video max-h-[80vh] overflow-hidden">
            <iframe
                src={media.url}
                title={media.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
