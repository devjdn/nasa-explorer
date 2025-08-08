import { Sparkles, Github, ExternalLink, Rocket } from "lucide-react";
import Link from "next/link";

type LinksType = Array<{ name: string; url: string }>;

export const links: LinksType = [
    { name: "APOD", url: "/apod" },
    { name: "Mars Rover Photos", url: "/mars-rover-photos" },
    { name: "NeoWs", url: "/neows" },
    { name: "Image & Video Library", url: "/library" },
    { name: "Space Weather", url: "/space-weather" },
];

export default function Footer() {
    return (
        <footer className="border-t mt-14 bg-background">
            <div className="max-w-11/12 mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={18} />
                            <span className="font-semibold text-base">
                                NASA API Explorer
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Explore the cosmos through NASA&apos;s incredible
                            collection of APIs and discover the wonders of
                            space.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Explore</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {links.map((l, i) => (
                                <Link
                                    key={i}
                                    href={l.url}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    {l.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Resources</h3>
                        <div className="space-y-2">
                            <a
                                href="https://api.nasa.gov"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                <ExternalLink size={14} />
                                NASA Open Data Portal
                            </a>
                            <a
                                href="https://github.com/devjdn/nasa-explorer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                <Github size={14} />
                                View Source Code
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Rocket size={14} />
                        <span>Built with NASA&apos;s Open APIs</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} NASA API Explorer. Data
                        provided by NASA.
                    </p>
                </div>
            </div>
        </footer>
    );
}
