import { Search } from 'lucide-react';
import { usePokemon } from '../../context/pokemonContext';
import { useState } from 'react';
import { ResultSearchBarComponent } from './result-search-bar.component';
export default function SearchBarComponent() {
    const { tier, pokemonList, selectPokemon } = usePokemon();
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<React.ReactNode[]>([]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const rawValue = e.target.value;
        const value = rawValue.replace(/[^a-zA-Z0-9]/g, "");

        setSearch(value);
        if (value == "") {
            setShowResults(false);
            setResults([]);
        } else {
            setShowResults(true);
            filterResults(value);
        }
    }

    function filterResults(search: string) {
        const isNumeric = /^\d+$/.test(search);
        const filtered = pokemonList.filter((pokemon) => {
            return isNumeric
                ? pokemon.id.toString().includes(search)
                : pokemon.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        });
        const res = filtered.map((pokemon) => (
            <ResultSearchBarComponent key={pokemon.id} id={pokemon.id} name={pokemon.name} clearSearch={clearSearch} />
        ));
        setResults(res);
    }

    function clearSearch(id: number) {
        selectPokemon(id);
        setSearch("");
        setShowResults(false);
    }

    return (
        <div>
            <div className={`
                backdrop-blur-md rounded-full
                border border-gray-200/50 dark:border-gray-600/50 shadow-lg
                transition-transform duration-300 hover:scale-105 focus:scale-105
                group/search
                ${tier === "legendary"
                    ? "bg-legendary"
                    : tier === "mythical"
                        ? "bg-mythical"
                        : "bg-white/80 dark:bg-slate-800/80"
                }
            `}>
                <div className={`px-6 py-1`}>
                    <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <Search />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent p-2 focus:outline-none"
                            name="searchPokemon"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    {showResults && (
                        <div className="
                            backdrop-blur-md bg-white/80 dark:bg-slate-800/80
                            shadow-lg border border-gray-200/50 dark:border-gray-600/50 
                            absolute left-0 mt-4 z-40 p-4 pr-0
                            h-fit max-h-[15rem] w-full rounded-xl overflow-auto 
                        ">
                            <div className='w-full h-full overflow-auto flex flex-col gap-2 pr-4 group/result'>
                                {results.length > 0 ? results : <p className='text-gray-500 dark:text-gray-400'>No results</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}