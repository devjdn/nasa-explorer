import { Button } from "@/components/ui/button";
import { NasaApodResponse } from "@/types/apod";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlsProps {
    apod: NasaApodResponse;
}

function getTodayEST(): string {
    const now = new Date();
    // Convert to Eastern Time (New York timezone)
    const estDate = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(now);

    // Convert MM/DD/YYYY → YYYY-MM-DD
    const [month, day, year] = estDate.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export default function APODControls({ apod }: ControlsProps) {
    const currentDate = new Date(apod.date);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const todayEST = getTodayEST();
    const isToday = formatDate(currentDate) === todayEST;

    return (
        <nav className="inline-flex gap-2 items-center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"secondary"} size={"icon"} asChild>
                        <Link href={`/apod/${formatDate(previousDate)}`}>
                            <ArrowLeft />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Previous APOD</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    {isToday ? (
                        <Button variant={"secondary"} size={"icon"} disabled>
                            <ArrowRight />
                        </Button>
                    ) : (
                        <Button variant={"secondary"} size={"icon"} asChild>
                            <Link href={`/apod/${formatDate(nextDate)}`}>
                                <ArrowRight />
                            </Link>
                        </Button>
                    )}
                </TooltipTrigger>
                <TooltipContent>Next APOD</TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button asChild variant={"secondary"} size={"icon"}>
                        <Link target="_blank" href={apod.hdurl || apod.url}>
                            <ExternalLink className="size-3" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Open Externally</TooltipContent>
            </Tooltip>
        </nav>
    );
}
