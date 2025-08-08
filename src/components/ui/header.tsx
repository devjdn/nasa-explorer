"use client";

import clsx from "clsx";
import { Sparkles } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import ThemeSwitcher from "./theme-switcher";

type LinksType = Array<{ name: string; url: string }>;

export const links: LinksType = [
    { name: "APOD", url: "/apod" },
    { name: "Mars Rover Photos", url: "/mars-rover-photos" },
    { name: "NeoWs", url: "/neows" },
    { name: "Image & Video Library", url: "/library" },
    { name: "Space Weather", url: "/space-weather" },
];

export default function Header() {
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });
    const pathname = usePathname();
    const { theme } = useTheme();

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Sentinel element */}
            <div className="h-0" ref={ref}></div>

            <header
                className={clsx(
                    "top-0 z-50 mx-auto w-full h-14 px-4 flex items-center gap-12 transition-all duration-300",
                    inView
                        ? "bg-background"
                        : "bg-linear-to-b from-background from-30%  to-transparent",
                    { "bg-background": theme === "light" },
                    { fixed: pathname === "/" },
                    { sticky: pathname !== "/" }
                )}
            >
                <Link href={"/"}>
                    <div className="flex items-center gap-2">
                        <Sparkles size={18} />
                        <span className="font-semibold text-base">
                            NASA API Explorer
                        </span>
                    </div>
                </Link>
                <nav className="hidden md:flex justify-between items-center flex-1">
                    <div className="flex items-center gap-8">
                        {links.map((l, i) => (
                            <Link key={i} className="group" href={l.url}>
                                <p
                                    className={clsx(
                                        "text-sm group-hover:text-foreground transition-colors duration-200",
                                        {
                                            "text-muted-foreground":
                                                !pathname.includes(l.url),
                                        },
                                        {
                                            "text-foreground":
                                                pathname.includes(l.url),
                                        }
                                    )}
                                >
                                    {l.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <ThemeSwitcher />
                </nav>
            </header>
        </>
    );
}
