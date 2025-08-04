import { RandomAPODs } from "@/components/ui/apod/random-apods";
import APODHero from "@/components/ui/apod/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";

export default async function NASAAPODGallery() {
    const apod = await fetchApod();
    return (
        <div className="min-h-screen bg-background space-y-12">
            <APODHero image={apod} />
            <div className="w-11/12 mx-auto">
                <RandomAPODs />
            </div>
        </div>
    );
}
