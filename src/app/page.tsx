import FooterComponent from "./components/footer.component";
import HomeComponent from "./components/home.component";
import SearchBarComponent from "./components/search-bar.component";

export default function Home() {
    return (
        <section className="px-[1.5rem] md:px-[4rem] xl:pt-[2rem] xl:max-w-7xl xl:m-auto">
            <header>
                <SearchBarComponent />
            </header>
            <main>
                <HomeComponent />
                <FooterComponent />
            </main>
        </section>
    );
}
