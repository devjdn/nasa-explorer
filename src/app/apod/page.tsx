import { RandomAPODs } from "@/components/ui/apod/random-apods";
import APODHero from "@/components/ui/apod/hero-apod";
import { fetchApod } from "@/lib/nasa/nasa";
import { Separator } from "@/components/ui/separator";
import APODGrid from "@/components/ui/apod/apod-grid";

function formatDate(date: Date): string {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
}

export default async function NASAAPODGallery() {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 9);

    const range = {
        startDate: formatDate(tenDaysAgo),
        endDate: formatDate(today),
    };

    const [apod, rangeApods] = await Promise.all([
        fetchApod(),
        fetchApod({ range }),
    ]);

    const apodsLastTen = Array.isArray(rangeApods)
        ? rangeApods.slice().reverse()
        : [];

    return (
        <div className="min-h-screen bg-background space-y-14">
            {!Array.isArray(apod) && <APODHero image={apod} />}

            <div className="w-11/12 mx-auto space-y-12">
                {Array.isArray(apodsLastTen) && (
                    <APODGrid apods={apodsLastTen} />
                )}

                <Separator />
                <RandomAPODs />
            </div>
        </div>
    );
}
