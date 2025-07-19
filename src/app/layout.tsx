import "./globals.css";
import type { Metadata } from "next";
import { Geist } from 'next/font/google';

const geist = Geist({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Pokédex by Lautaro Olivera",
    description:
        "Discover, capture and learn everything about Pokémon! Explore stats, moves, evolutions, regions and unlock achievements in this interactive Pokédex.",
    metadataBase: new URL("https://pokedex-one-beta-60.vercel.app"),
    openGraph: {
        title: "Pokedex by Lautaro Olivera",
        description:
            "Discover, capture and learn everything about Pokémon! Explore stats, moves, evolutions, regions and unlock achievements in this interactive Pokédex.",
        url: "https://pokedex-one-beta-60.vercel.app",
        siteName: "Pokedex",
        type: "website",
        images: [
            {
                url: "https://pokedex-one-beta-60.vercel.app/assets/images/cover.jpg",
                width: 1200,
                height: 630,
                alt: "Pokedex - Discover and Capture Pokémon",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pokedex by Lautaro Olivera",
        description:
            "Explore Pokémon stats, types, evolutions and unlock achievements as you complete the interactive Pokédex!",
        images: ["https://pokedex-one-beta-60.vercel.app/assets/images/cover.jpg"],
    },
};

export const viewport = {
    themeColor: "#eeeeee",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geist.className} transition-colors duration-300`}>
            <body className="geist-font font-sans min-h-screen bg-gray-50 dark:bg-black">
                {children}
            </body>
        </html>
    );
}
