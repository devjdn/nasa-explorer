import Link from "next/link";
import { Rocket, Home, ArrowLeft, Satellite } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex-1 flex items-center justify-center px-4 pt-14">
            <div className="text-center space-y-8 max-w-md">
                {/* Animated Satellite */}
                <div className="relative">
                    <div className="">
                        <Satellite
                            size={64}
                            className="mx-auto text-muted-foreground"
                        />
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-muted-foreground">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold">Lost in Space</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Houston, we have a problem. The page you&apos;re looking
                        for has drifted into the cosmic void.
                    </p>
                </div>

                {/* Navigation Options */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                        <Rocket size={18} />
                        Return to Mission Control
                    </Link>

                    <div className="flex justify-center gap-4">
                        <Link
                            href="/apod"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                            <Home size={16} />
                            Astronomy Pictures
                        </Link>
                        <Link
                            href="/mars-rover-photos"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                            <ArrowLeft size={16} />
                            Mars Exploration
                        </Link>
                    </div>
                </div>

                {/* Fun Space Fact */}
                <div className="pt-8 border-t border-border/50">
                    <p className="text-xs text-muted-foreground italic">
                        Fun fact: Voyager 1 is over 14 billion miles from Earth
                        and still transmitting data!
                    </p>
                </div>
            </div>
        </div>
    );
}
