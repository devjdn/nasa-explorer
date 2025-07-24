import APODHeroDialog from "@/components/ui/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";
import Image from "next/image";

export default async function Home() {
    const apod = await fetchApod();
    console.log(apod);
    return (
        <div>
            <div className="mx-auto space-y-4 w-9/10">
                <h1 className="font-semibold text-2xl md:3xl lg:text-4xl">
                    Astronomy Picture of the Day
                </h1>
                <APODHeroDialog image={apod} />
            </div>
        </div>
    );
}
