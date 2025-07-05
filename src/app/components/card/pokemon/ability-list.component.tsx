import { useEffect, useState } from "react";
import { Pokemon } from "@/app/models/dto/pokemon.model";
import { Generic } from "@/app/models/dto/generic.model";
import { getByUrl } from "@/app/services/pokemon.service";
import { useLanguage } from "@/app/context/languageContext";
import { Effect } from "@/app/models/dto/effect.model";
import { AbilityComponent } from "./ability.component";

export type AbilityProps = {
    name: string;
    effect: string;
    shortEffect: string;
};

type Entry = {
    language: { name: string };
    flavor_text: string;
};

type AbilityData = {
    flavor_text_entries: Entry[];
};

function getFirstFlavorTexts(data: AbilityData) {
    const langs = {
        en: "en",
        es: "es",
        ja: ["ja", "ja-Hrkt"], // japonés puede venir en dos formas
    };

    const result: Record<string, string | undefined> = {
        en: undefined,
        es: undefined,
        ja: undefined,
    };

    for (const entry of data.flavor_text_entries) {
        const lang = entry.language.name;

        if (!result.en && lang === langs.en) {
            result.en = entry.flavor_text;
        }

        if (!result.es && lang === langs.es) {
            result.es = entry.flavor_text;
        }

        if (
            !result.ja &&
            (lang === langs.ja[0] || lang === langs.ja[1])
        ) {
            result.ja = entry.flavor_text;
        }

        // Si ya encontramos los 3, salimos
        if (result.en && result.es && result.ja) break;
    }

    return result;
}

export const AbilitiesList = ({ pokemonData }: { pokemonData: Pokemon }) => {
    const { language } = useLanguage();
    const [abilities, setAbilities] = useState<AbilityProps[]>([]);

    useEffect(() => {
        const fetchAbilities = async () => {
            if (!pokemonData?.abilities) return;

            const abilityDetails = await Promise.all(
                pokemonData.abilities.map(async (abilityObj: { ability: Generic }) => {
                    try {
                        const abilityData = await getByUrl(abilityObj.ability.url);

                        const effectEntry = abilityData.effect_entries.find(
                            (entry: Effect) => entry.language.name === language
                        );

                        const flavorTexts = getFirstFlavorTexts(abilityData);

                        return {
                            name: abilityData.name,
                            effect: effectEntry?.effect || flavorTexts[language] || "",
                            shortEffect: effectEntry?.short_effect || "", // o también podrías usar flavorTexts[language]
                        };
                    } catch (error) {
                        console.error("Error fetching ability:", error);
                        return null;
                    }
                })
            );

            setAbilities(abilityDetails.filter((ab): ab is AbilityProps => ab !== null));
        };

        fetchAbilities();
    }, [pokemonData, language]);

    if (abilities.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            {abilities.map((ability, index) => (
                <AbilityComponent
                    key={`${ability.name}-${index}`}
                    name={ability.name}
                    effect={ability.effect}
                    shortEffect={ability.shortEffect}
                />
            ))}
        </div>
    );
};
