"use client";

import Image from "next/image";
import Link from "next/link";
import { NasaApodResponse } from "@/types/nasa";
import { useRandomAPODData } from "@/hooks/use-nasa-apod";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

export function RandomAPODs() {
    const { data, isLoading, isError, error, refetch, isFetching } =
        useRandomAPODData();
    return (
        <div className="p-6 rounded-xl bg-secondary space-y-4">
            <header className="flex items-end justify-between">
                <div>
                    <h3 className="text-base md:text-lg font-semibold">
                        Randomised APODs
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Randomised APODs from NASA's APOD archive.
                    </p>
                </div>
                <Button
                    onClick={() => refetch()}
                    disabled={isFetching}
                    variant="ghost"
                    className="cursor-pointer"
                >
                    <RefreshCw
                        className={clsx("w-4 h-4", {
                            "animate-spin": isFetching,
                        })}
                    />
                    {isFetching ? "Shuffling..." : "Shuffle"}
                </Button>
            </header>
            {isLoading ? (
                <div className="min-h-[50vh] flex items-center justify-center">
                    <p className="text-muted-foreground">
                        Loading random APODs...
                    </p>
                </div>
            ) : isError ? (
                <div className="min-h-[50vh] flex items-center justify-center">
                    <p className="text-red-500">
                        Failed to load: {error?.message}
                    </p>
                </div>
            ) : (
                <div className="gap-x-4 gap-y-0 flex flex-col md:grid md:grid-cols-2">
                    {data?.map((apod, index) => (
                        <Link
                            href={`/apod/${apod.date}`}
                            key={index}
                            className={clsx(
                                "flex items-center gap-4 py-2 group border-b",
                                {
                                    "md:border-none":
                                        index === 6 || index === 7,
                                },
                                { "border-none": index === 7 }
                            )}
                        >
                            {/* APOD Thumbnail */}
                            <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
                                {apod.media_type === "image" ? (
                                    <img
                                        src={apod.url || "/placeholder.svg"}
                                        alt={apod.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground">
                                            VIDEO
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* APOD Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                    {apod.title}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate">
                                    {new Date(apod.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
