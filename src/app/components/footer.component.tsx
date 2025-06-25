
export default function FooterComponent() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-6">
                    <a href="https://github.com/kappaggaeru" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                        aria-label="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    </a>
                </div>
                <div className="text-center text-xl text-gray-500">
                    <p>
                        Made by
                        <a href="https://lautaroolivera.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 ml-1">
                            Lautaro Olivera
                        </a>
                    </p>
                </div>
                <div className="text-center text-sm text-gray-500">
                    <p>{`
                        This site is not affiliated with "The Pokémon Company" and does not own or claim any rights to any Nintendo trademark or the Pokémon trademark.
                    `}
                    </p>
                    <p>All shown data belongs to <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200">PokeAPI</a></p>
                </div>
            </div>
        </div>
    );
}