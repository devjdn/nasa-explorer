import { fetchApod } from "@/lib/nasa/nasa";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    ImageIcon,
    VideoIcon,
    Calendar,
    Copyright,
    TriangleAlert,
    FileQuestion,
} from "lucide-react";
import APODMedia from "@/components/ui/apod/apod-media";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import APODControls from "@/components/ui/apod/date-page-controls";
import type { Metadata } from "next";
import { NasaApodResponse } from "@/types/apod";

export const revalidate = 86400;

export async function generateStaticParams() {
    const today = new Date();
    const dates = [...Array(30)].map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return {
            date: date.toISOString().split("T")[0],
        };
    });

    return dates;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ date: string }>;
}): Promise<Metadata> {
    const { date } = await params;
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) return {};

    try {
        const apod = await fetchApod({ date });
        if (!apod || Array.isArray(apod) || !apod.title) {
            return {};
        }

        return {
            title: `${apod.title} | APOD`,
            description:
                apod.explanation?.slice(0, 150) ||
                "Astronomy Picture of the Day",
        };
    } catch {
        return {};
    }
}

export default async function APODDatePage({
    params,
}: {
    params: Promise<{ date: string }>;
}) {
    const { date } = await params;
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) return notFound();

    let apod;

    try {
        apod = await fetchApod({ date });
        if (
            !apod ||
            Array.isArray(apod) ||
            typeof apod !== "object" ||
            !apod.date
        ) {
            return notFound();
        }
    } catch {
        return notFound();
    }

    const renderMediaType = () => {
        switch (apod.media_type) {
            case "image":
                return (
                    <>
                        <ImageIcon />
                        <span>Image</span>
                    </>
                );
            case "video":
                return (
                    <>
                        <VideoIcon />
                        <span>Video</span>
                    </>
                );
            default:
                return (
                    <>
                        <FileQuestion />
                        <span>Unknown</span>
                    </>
                );
        }
    };

    return (
        <div className="px-4 py-14 md:px-8 space-y-8 max-w-prose mx-auto">
            <header className="space-y-2">
                <div className="flex justify-between items-center gap-8">
                    <h1 className="font-semibold text-2xl md:text-3xl">
                        {apod.title}
                    </h1>
                    {(apod.media_type === "image" ||
                        apod.media_type === "video") && (
                        <APODControls apod={apod} />
                    )}
                </div>
                <div className="flex items-center flex-wrap gap-2">
                    <Badge variant="secondary">{renderMediaType()}</Badge>
                    <Badge variant={"secondary"}>
                        <Calendar />
                        <span>
                            {new Date(apod.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </Badge>
                    {apod.copyright && (
                        <Badge variant={"secondary"}>
                            <Copyright />
                            <span>{apod.copyright}</span>
                        </Badge>
                    )}
                </div>
            </header>

            <Alert className="md:hidden w-fit mx-auto">
                <TriangleAlert />
                <AlertTitle>Best Viewed on Desktop</AlertTitle>
                <AlertDescription className="max-w-[65ch]">
                    NASA&apos;s images are often high-resolution and optimized
                    for landscape displays, so for the best viewing experience,
                    we recommend using a desktop device.
                </AlertDescription>
            </Alert>

            <APODMedia media={apod} />

            <section className="space-y-2">
                <h2 className="text-lg font-semibold md:text-xl">
                    Explanation
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                    {apod.explanation}
                </p>
            </section>
        </div>
    );
}
