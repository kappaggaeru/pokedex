"use client";
import FooterComponent from "./components/footer.component";
import HeaderComponent from "./components/header.component";
import HomeComponent from "./components/home.component";
import { MenuProvider } from "./context/menuContext";
import { PokemonProvider } from "./context/pokemonContext";

export default function Home() {
    return (
        <PokemonProvider>
            <MenuProvider>
                <section>
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
                        <HeaderComponent />
                    </div>
                    <main className="max-w-5xl mx-auto xl:py-6">
                        <HomeComponent />
                    </main>
                    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-600/50 mt-20">
                        <FooterComponent />
                    </footer>
                </section>
            </MenuProvider>
        </PokemonProvider>
    );
}
