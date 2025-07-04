"use client";
import FooterComponent from "./components/footer.component";
import HeaderComponent from "./components/header.component";
import HomeComponent from "./components/home.component";
import AppProviders from "./context/appContext";

export default function Home() {
    return (
        <AppProviders>
            <section>
                <HeaderComponent />
                <main className="max-w-5xl mx-auto">
                    <HomeComponent />
                </main>
                <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-600/50 mt-20">
                    <FooterComponent />
                </footer>
            </section>
        </AppProviders>
    );
}
