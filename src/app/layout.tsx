import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pokedex",
    description: "A pokemon indexator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="transition-colors duration-300">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
            </head>
            <body className="min-h-screen bg-gray-50 dark:bg-black">
                {children}
            </body>
        </html>
    );
}
