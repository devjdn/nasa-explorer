import APODHero from "@/components/ui/apod/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const apod = await fetchApod();
    return (
        <div className="flex-1 w-full relative pt-14">
            <section className="relative max-w-prose w-full mx-auto space-y-2 text-center z-50 py-14">
                <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl">
                    Exploring space made easy.
                </h1>
                <p className="text-base text-muted-foreground md:text-lg xl:text-xl">
                    View the most distant, stunning areas of our universe
                    through the power of the NASA API.
                </p>
            </section>
        </div>
    );
}
