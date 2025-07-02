import React, { useEffect, useMemo, useState } from "react";
import { PokedexEntry } from "../../../models/pokedex-entry.model";
import FadeText from "../../text/fade-text.component";
import { Flavor } from "@/app/models/dto/flavor.model";
import { useLanguage } from "@/app/context/languageContext";
import { formatFlavorText } from "@/app/utils/stringUtils";

type Props = {
    entries: Flavor[];
};

const PokedexEntryComponent: React.FC<Props> = ({ entries }) => {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const groupedEntries = useMemo(() => {
        const en: PokedexEntry[] = [];
        const es: PokedexEntry[] = [];
        const ja: PokedexEntry[] = [];

        entries.forEach((flavor) => {
            const entry: PokedexEntry = {
                language: flavor.language.name ?? '',
                entry: formatFlavorText(flavor.flavor_text),
                version: flavor.version.name ?? '',
            };

            switch (flavor.language.name) {
                case 'en':
                    en.push(entry);
                    break;
                case 'es':
                    es.push(entry);
                    break;
                case 'ja':
                case 'ja-Hrkt':
                    ja.push(entry);
                    break;
            }
        });

        return { en, es, ja };
    }, [entries]);

    // Seleccionamos el arreglo que corresponde según el idioma del contexto
    const selectedEntries = useMemo(() => {
        switch (language) {
            case 'es':
                return groupedEntries.es;
            case 'ja':
                return groupedEntries.ja;
            case 'en':
            default:
                return groupedEntries.en;
        }
    }, [groupedEntries, language]);

    // Reiniciar índice cuando cambian los entries
    useEffect(() => {
        setCurrentIndex(0);
    }, [selectedEntries]);

    const currentEntry = selectedEntries[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? selectedEntries.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === selectedEntries.length - 1 ? 0 : prev + 1
        );
    };

    if (!currentEntry) return null; // O puedes renderizar un fallback

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">
                Pokedex entry
                {currentEntry.version && (
                    <span className="text-sm font-medium italic ml-2 text-gray-500 dark:text-gray-400">
                        ({currentEntry.version})
                    </span>
                )}
            </h3>
            <FadeText key={currentEntry.entry} text={currentEntry.entry} />
            <div className="mt-4 flex justify-end gap-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                <button
                    onClick={handlePrev}
                    className="border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PokedexEntryComponent;
