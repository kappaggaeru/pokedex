import Head from 'next/head';
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from 'next/font/google';

export const metadata: Metadata = {
    title: "Pokedex",
    description: "A pokemon indexator",
};

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '700'], // elegí los que vas a usar
  display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geist.className} transition-colors duration-300`}>
            <Head>
                <meta name="theme-color" content="#fff" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body className="geist-font font-sans min-h-screen bg-gray-50 dark:bg-black">
                {children}
            </body>
        </html>
    );
}
