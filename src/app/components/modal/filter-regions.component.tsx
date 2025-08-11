import { usePokemon } from "@/app/context/pokemonContext"

export function FilterRegionsComponent() {
    const { generations, toggleFilteredRegion, filteredRegions } = usePokemon();

    const activeRegion = "bg-indigo-100 dark:bg-indigo-900 border-indigo-400 dark:border-indigo-500 border text-indigo-700 dark:text-indigo-300 shadow-md";
    const inactiveRegion = "bg-slate-50 dark:bg-slate-700 border-gray-200/50 dark:border-gray-600/50 text-gray-500 dark:text-gray-400";

    const regionChips = generations.map((gen, index) => (
        <div key={index}
            className={`
                rounded-full px-4 py-2
                border cursor-pointer
                ${filteredRegions.includes(gen.name) ? activeRegion : inactiveRegion}
            `}
            onClick={() => toggleFilteredRegion(gen.name)}>
            {gen.name}
        </div>
    ));
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-gray-500 dark:text-gray-400">Filter Regions:</h1>
            <div className="flex flex-row flex-wrap gap-2">
                {regionChips}
            </div>
        </div>
    )
}