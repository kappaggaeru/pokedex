import FooterComponent from "./components/footer.component";
import HomeComponent from "./components/home.component";
import SearchBarComponent from "./components/search-bar.component";

export default function Home() {
    return (
        <section className="p-[1.5rem] md:p-[4rem] xl:p-[2rem] xl:max-w-7xl xl:m-auto">
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
