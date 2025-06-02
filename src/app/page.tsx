import HomeComponent from "./components/home-component";

export default function Home() {
    return (
        <section>
            <main>
                <div className="bg-red-500 text-white p-4 text-xl">
                    Tailwind está funcionando 🎉
                </div>
                <HomeComponent />
            </main>
        </section>
    );
}
