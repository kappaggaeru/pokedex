import React, { useState } from "react";
import { PokedexEntry } from "../../../models/pokedex-entry.model";
import FadeText from "../../text/fade-text.component";

type Props = {
    entries: PokedexEntry[];
}

const PokedexEntryComponent: React.FC<Props> = ({ entries }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentEntry = entries[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? entries.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === entries.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">
                Pokedex entry
                {currentEntry?.version && (
                    <span className="text-sm font-medium italic ml-2 text-gray-500 dark:text-gray-400">
                        ({currentEntry.version})
                    </span>
                )}
            </h3>
            <FadeText key={currentEntry.entry} text={currentEntry.entry} />
            <div className={`
            mt-4 flex justify-end gap-4 text-sm font-medium text-gray-500 dark:text-gray-300
            `}>
                <button onClick={handlePrev} className="
                    border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500
                ">
                    Previous
                </button>
                <button onClick={handleNext} className="
                    border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500
                ">
                    Next
                </button>
            </div>
        </div>
    );
}
export default PokedexEntryComponent;