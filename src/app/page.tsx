import APODHero from "@/components/ui/apod/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const apod = await fetchApod();
    console.log(apod);
    return (
        <div className="min-h-screen w-full relative pt-14">
            {/* Dark Horizon Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
                }}
            />
            {/* Your Content/Components */}
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
