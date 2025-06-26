import { Search } from 'lucide-react';
export default function SearchBarComponent() {
    return (
        <div className="
            bg-white/80 dark:bg-slate-800/80
            backdrop-blur-md rounded-full
            border border-gray-200/50 dark:border-gray-600/50 shadow-lg
            transition-transform duration-300 hover:scale-105 focus:scale-105
            text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
        ">
            <div className="px-6 py-1">
                <div className="flex items-center space-x-2">
                    <Search className='' />
                    <input type="text" placeholder="Search" className="w-full bg-transparent p-2 focus:outline-none" name="searchPokemon" />
                </div>
            </div>
        </div>
    );
}