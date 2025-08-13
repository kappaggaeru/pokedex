import { useModal } from "@/app/context/modalContext";
import { usePokemon } from "@/app/context/pokemonContext";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResultSearchBarComponent } from "./result-search-bar.component";
import { formatText } from "@/app/utils/stringUtils";
import { FilterRegionsComponent } from "./filter-regions.component";
import { KeyButton } from "@/app/buttons/key.button";

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && showModal) {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal, closeModal]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputRef.current) inputRef.current.blur();
        closeModal();
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
            closeModal();
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
        <div onClick={closeModal}
            className={`
            fixed left-0 right-0 top-10 md:inset-0 
            flex justify-center md:items-center
            mt-10 md:mt-0 cursor-pointer
            ${showModal ? "z-40 pointer-events-auto" : "z-0 pointer-events-none"}
        `}>
            <div onClick={(e) => e.stopPropagation()} // Evita que clic dentro cierre
                className={`
                w-[90%] h-[400px] md:h-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%]
                rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md
                border border-gray-200/50 dark:border-gray-600/50
                flex flex-col shadow-xl z-50 cursor-default
                transform transition-all duration-300 ease-out
                ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
            `}>
                <div className="flex flex-row justify-between items-center px-4 py-2 border-b-2 border-gray-100 dark:border-slate-700">
                    <Search className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            ref={inputRef}
                            type="text"
                            name="searchPokemon"
                            value={search}
                            placeholder="Type a pokémon name or id"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent p-2 focus:outline-none text-gray-600 dark:text-gray-400 text-md"
                        />
                    </form>
                    <div className="cursor-pointer" onClick={closeModal}>
                        <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-4">
                    {showResults && (
                        <div className="flex flex-col gap-2">
                            {results.length > 0 ? results : (
                                <p className="text-gray-500 dark:text-gray-400">No results</p>
                            )}
                        </div>
                    )}
                    {!search && (
                        <FilterRegionsComponent />
                    )}
                </div>
                <div className="flex flex-row justify-end gap-2 items-center p-4 border-t-2 border-gray-100 dark:border-slate-700 text-sm text-gray-400">
                    <span>Go to pokémon <KeyButton>{'\u21A9'}</KeyButton></span>
                    <div>|</div>
                    <span>Exit <KeyButton>Esc</KeyButton></span>
                </div>
            </div>
        </div>
    )
}