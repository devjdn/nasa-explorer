"use client";

import clsx from "clsx";
import { Sparkle } from "lucide-react";
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
                    "sticky top-0 z-50 mx-auto w-full h-14 px-4 flex items-center justify-between gap-4 transition-all duration-300",
                    inView ? "bg-transparent" : "bg-background"
                )}
            >
                <Link href={"/"}>
                    <div className="flex items-center gap-2">
                        <Sparkle size={18} />
                        <span className="font-semibold text-base">
                            NASA API Explorer
                        </span>
                    </div>
                </Link>
                <ThemeSwitcher />
            </header>
        </>
    );
}
