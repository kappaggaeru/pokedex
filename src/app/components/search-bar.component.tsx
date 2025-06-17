import { Search } from 'lucide-react';
export default function SearchBarComponent() {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-lg">
            <div className="px-6 py-3">
                <div className="flex items-center space-x-2">
                    <Search className='text-gray-400'/>
                    <input type="text" placeholder="Search" className="w-full bg-transparent p-2 focus:outline-none" name="searchPokemon" />
                </div>
            </div>
        </div>
    );
}