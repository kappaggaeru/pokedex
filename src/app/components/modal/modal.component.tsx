import { useModal } from "@/app/context/modalContext";
import { usePokemon } from "@/app/context/pokemonContext";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResultSearchBarComponent } from "./result-search-bar.component";
import { formatText } from "@/app/utils/stringUtils";
import { FilterRegionsComponent } from "./filter-regions.component";

export function ModalComponent() {
    const { toggleModal, showModal } = useModal();
    const { pokemonList, selectPokemon } = usePokemon();
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<React.ReactNode[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [resultData, setResultData] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        if (showModal && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showModal]);

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

        setResultData(filtered);
        const res = filtered.map((pokemon, index) => (
            <ResultSearchBarComponent
                key={pokemon.id}
                id={pokemon.id}
                name={formatText(pokemon.name, "-")}
                completeSearch={clearSearch}
                isSelected={index === 0}
            />
        ));
        setResults(res);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && search.trim() !== "" && resultData.length > 0) {
            const first = resultData[0];
            clearSearch(first.id);
        }
    }

    function clearSearch(id: number) {
        selectPokemon(id);
        closeModal();
    }

    function closeModal() {
        setSearch("");
        setShowResults(false);
        toggleModal();
    }

    return (
        <div
            className={`
                fixed py-2 z-10 left-0 right-0
                mx-auto h-[50%] w-[90%] md:w-[50%] lg:w-[30%]
                rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md
                border border-gray-200/50 dark:border-gray-600/50
                flex flex-col gap-2
                transform transition-all duration-300 ease-out
                ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}
            `}
        >
            <div className="flex flex-row justify-between items-center px-4 pb-2 border-b-2 border-gray-100 dark:border-slate-700">
                <Search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    name="searchPokemon"
                    value={search}
                    placeholder="Type a pokémon name or id"
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent p-2 focus:outline-none text-gray-600 dark:text-gray-400 text-md"
                />
                <div className="border border-gray-200/50 dark:border-gray-600/50 p-2 cursor-pointer rounded-full">
                    <X className="w-6 h-6 text-gray-500 dark:text-gray-400" onClick={() => closeModal()} />
                </div>
            </div>
            {showResults && (
                <div className="w-full h-full overflow-auto px-4 py-2">
                    <div className='w-full h-full flex flex-col gap-2'>
                        {results.length > 0 ? results : <p className='text-gray-500 dark:text-gray-400'>No results</p>}
                    </div>
                </div>
            )}
            {!search && (
                <div className="px-4">
                    <FilterRegionsComponent />
                </div>
            )}
        </div>
    )
}