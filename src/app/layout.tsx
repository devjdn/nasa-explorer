import type { Metadata } from "next";
import {
    DM_Sans,
    Geist,
    Geist_Mono,
    Host_Grotesk,
    IBM_Plex_Sans,
    Inter,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/ui/header";

const hostGrotesk = Host_Grotesk({
    variable: "--font-host-grotesk",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NASA API Explorer",
    description:
        "Explore and interact with NASA's public APIs to discover space imagery, mission data, and scientific information. Instantly access and visualize NASA's vast collection of data with an intuitive, user-friendly interface.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${hostGrotesk.variable} ${geistMono.variable} min-h-[200vh] flex flex-col antialiased`}
            >
                <ThemeProvider enableSystem defaultTheme="system">
                    <Header />
                    <main className="flex-1 py-6">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
