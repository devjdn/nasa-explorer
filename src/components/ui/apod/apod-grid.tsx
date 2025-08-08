import { NasaApodResponse } from "@/types/apod";
import Link from "next/link";
import Image from "next/image";
import File from "@/app/../../public/file.svg";

export default function APODGrid({ apods }: { apods: NasaApodResponse[] }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 line-clamp-2">
                APODs this week
            </h2>
            <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {apods?.map((item, index) => (
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
                                            {new Date(
                                                item.date
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                            </Link>
                        ) : item.media_type === "image" ? (
                            <Link
                                href={`/apod/${item.date}`}
                                rel="noopener noreferrer"
                                className="block relative group overflow-hidden aspect-square"
                            >
                                <Image
                                    src={item.url || File}
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
                                    <p className="text-white/80 text-xs">
                                        {new Date(item.date).toLocaleDateString(
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
                        ) : (
                            <Link
                                href={`/apod/${item.date}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative group overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square"
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <div className="w-12 h-12 mx-auto mb-2 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-xs font-medium truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(
                                                item.date
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
