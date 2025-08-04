"use client";

import clsx from "clsx";
import { Sparkle, Sparkles } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import Link from "next/link";

export default function Header() {
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });
    return (
        <>
            {/* Sentinel element */}
            <div className="h-0" ref={ref}></div>

            <header
                className={clsx(
                    "sticky top-0 z-50 mx-auto w-full h-14 px-4 flex items-center gap-8 transition-all duration-300",
                    inView
                        ? "bg-transparent"
                        : "bg-linear-to-b from-background to-transparent backdrop-blur-sm"
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
                <nav className="hidden md:flex justify-between items-center"></nav>
            </header>
        </>
    );
}
