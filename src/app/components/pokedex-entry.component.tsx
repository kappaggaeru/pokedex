import React, { useEffect, useState } from "react";
import { PokedexEntry } from "../models/pokedex-entry.model";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DefaultButton from "../buttons/default.button";

type Props = {
    entries: PokedexEntry[];
    onEntryChange: (text: string) => void;
}

const PokedexEntryComponent: React.FC<Props> = ({ entries, onEntryChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        onEntryChange(entries[currentIndex].entry);
    }, [currentIndex]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = entries.findIndex((entry) => entry.version === e.target.value);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    }

    const prevVersion = () => {
        setCurrentIndex((prev) => (prev - 1 + entries.length) % entries.length);
    };

    const nextVersion = () => {
        setCurrentIndex((prev) => (prev + 1) % entries.length);
    }


    const versions = entries.map((entry, index) => (
        <option key={index} value={entry.version}>
            {entry.version}
        </option>
    ));

    return (
        <div>
            <div className="flex flex-row justify-between flex-wrap">
                <DefaultButton onClick={prevVersion} isVisible={true} icon={ArrowLeft} className="shadow-lg" />
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full border border-gray-200/50 dark:border-gray-600/50 flex items-center shadow-xl">
                    <select
                        value={entries[currentIndex].version}
                        onChange={handleSelectChange}
                        name="versionSelector"
                        className="bg-white dark:bg-slate-800 w-fit focus:border-0 uppercase text-center focus:outline-none"
                    >
                        {versions}
                    </select>
                </div>
                <DefaultButton onClick={nextVersion} isVisible={true} icon={ArrowRight} className="shadow-lg"/>
            </div>
        </div>
    );
}
export default PokedexEntryComponent;