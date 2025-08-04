import { Button } from "@/components/ui/button";
import { NasaApodResponse } from "@/types/nasa";
import {
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Home,
} from "lucide-react";
import next from "next";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ControlsProps {
    apod: NasaApodResponse;
}

export default function APODControls({ apod }: ControlsProps) {
    const currentDate = new Date(apod.date);
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    return (
        <nav className="inline-flex gap-2 items-center">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"secondary"} size={"icon"} asChild>
                        <Link href={`/apod`}>
                            <Home className="size-4" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>APOD Home</TooltipContent>
            </Tooltip>
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
                    <Button variant={"secondary"} size={"icon"} asChild>
                        <Link href={`/apod/${formatDate(nextDate)}`}>
                            <ArrowRight />
                        </Link>
                    </Button>
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
