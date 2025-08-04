import APODHero from "@/components/ui/apod/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const apod = await fetchApod();
    console.log(apod);
    return (
        <div>
            <div className="mx-auto space-y-4">
                <Link href={"/apod"}>{/* <APODHero image={apod} /> */}</Link>
            </div>
        </div>
    );
}
