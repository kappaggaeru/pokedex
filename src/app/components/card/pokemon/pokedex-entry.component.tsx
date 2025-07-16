import React, { useEffect, useMemo, useState } from "react";
import { PokedexEntry } from "../../../models/pokedex-entry.model";
import FadeText from "../../text/fade-text.component";
import { Flavor } from "@/app/models/dto/flavor.model";
import { useLanguage } from "@/app/context/languageContext";
import { formatFlavorText } from "@/app/utils/stringUtils";
import { ActionButton } from "@/app/buttons/action-button";

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

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">
                Pokedex Entry
                {currentEntry && currentEntry.version ? (
                    <span className="text-sm font-medium italic ml-2 text-gray-500 dark:text-gray-400">
                        ({currentEntry.version})
                    </span>
                ) : (
                    <span className="text-sm font-medium italic ml-2 text-gray-500 dark:text-gray-400">
                        (N/A)
                    </span>
                )}
            </h3>

            {selectedEntries.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">N/A</p>
            ) : (
                <FadeText key={currentEntry.entry} text={currentEntry.entry} />
            )}

            <div className="mt-4 flex justify-end gap-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                <ActionButton text="previous" onClick={handlePrev} />
                <ActionButton text="next" onClick={handleNext} />
            </div>
        </div>
    );
};

export default PokedexEntryComponent;
