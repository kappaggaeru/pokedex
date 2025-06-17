import FooterComponent from "./components/footer.component";
import HomeComponent from "./components/home.component";
import SearchBarComponent from "./components/search-bar.component";

export default function Home() {
    return (
        <section>
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
                <SearchBarComponent />
            </div>
            <main className="max-w-5xl mx-auto px-4 py-6">
                <HomeComponent />
            </main>
            <footer className="bg-white border-t border-gray-200 mt-20">
                <FooterComponent />
            </footer>
        </section>
    );
}
