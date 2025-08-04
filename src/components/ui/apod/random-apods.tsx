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
                <ul className="gap-x-4 gap-y-0 flex flex-col md:grid md:grid-cols-2">
                    {data?.map((apod, index) => (
                        <li
                            key={index}
                            className={cn(
                                "flex items-center gap-4 py-2 group",
                                index !== 6 &&
                                    index !== 7 &&
                                    "border-b border-b-border"
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

                            {/* Link Button */}
                            <Button asChild variant={"ghost"}>
                                <Link href={`/apod/${apod.date}`}>
                                    <ExternalLink />
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

{
    /* <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {data?.map((item, index) => (
        <div key={`${item.date}-${index}`}>
            {item.media_type === "video" ? (
                <Link
                    href={`/apod/${item.date}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square"
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                            <div className="w-12 h-12 mx-auto mb-2 bg-red-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium truncate">
                                {item.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {item.date}
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                </Link>
            ) : (
                <Link
                    href={`/apod/${item.date}`}
                    rel="noopener noreferrer"
                    className="block relative group overflow-hidden aspect-square"
                >
                    <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 group-hover:bg-background/30 transition-all duration-200" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-white text-xs font-medium truncate">
                            {item.title}
                        </p>
                        <p className="text-white/80 text-xs">{item.date}</p>
                    </div>
                </Link>
            )}
        </div>
    ))}
</div>; */
}
