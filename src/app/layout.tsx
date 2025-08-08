import type { Metadata } from "next";
import { Geist_Mono, Host_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/ui/header";
import { QueryProvider } from "@/providers/query-provider";
import Footer from "@/components/ui/footer";

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
                className={`${hostGrotesk.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
            >
                {/* <script
                    crossOrigin="anonymous"
                    src="//unpkg.com/react-scan/dist/auto.global.js"
                /> */}
                <ThemeProvider enableSystem defaultTheme="system">
                    <QueryProvider>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
