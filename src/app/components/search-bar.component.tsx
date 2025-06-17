import { Search } from 'lucide-react';
export default function SearchBarComponent() {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-lg">
            <div className="px-6 py-3">
                <div className="flex items-center space-x-2">
                    {/* <a href="/" className="font-bold flex items-center gap-2 text-gray-900 text-2xl">
                    Pokedex
                    </a> */}
                    <Search className='text-gray-400'/>
                    <input type="text" placeholder="Search" className="w-full bg-transparent p-2 focus:outline-none"/>
                </div>
            </div>
        </div>
    );
}