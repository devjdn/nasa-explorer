import { fetchApod } from "@/lib/nasa/nasa";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    ImageIcon,
    VideoIcon,
    Calendar,
    Copyright,
    TriangleAlert,
} from "lucide-react";
import APODMedia from "@/components/ui/apod/apod-media";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import APODControls from "@/components/ui/apod/date-page-controls";

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
        // If the API responds with something unexpected, also trigger notFound
        if (
            !apod ||
            Array.isArray(apod) ||
            typeof apod !== "object" ||
            !apod.date
        ) {
            return notFound();
        }
    } catch (error) {
        return notFound();
    }
    if (!Array.isArray(apod)) {
        return (
            <div className="px-4 py-14 md:px-8 space-y-8 max-w-prose mx-auto">
                <header className="space-y-2">
                    <div className="flex justify-between items-center gap-8">
                        <h1 className="font-semibold text-2xl md:text-3xl">
                            {apod.title}
                        </h1>
                        <APODControls apod={apod} />
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                        <Badge variant="secondary">
                            {apod.media_type === "image" ? (
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
                                {new Date(apod.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
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
                        NASA&apos;s images are often high-resolution and
                        optimized for landscape displays, so for the best
                        viewing experience, we recommend using a desktop device.
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
}
