import { useEffect, useState } from "react";
import { Pokemon } from "@/app/models/dto/pokemon.model";
import { Generic } from "@/app/models/dto/generic.model";
import { getByUrl } from "@/app/services/pokemon.service";
import { useLanguage } from "@/app/context/languageContext";
import { Effect } from "@/app/models/dto/effect.model";
import { AbilityComponent } from "./ability.component";
import { FlavorProps, getFirstFlavorTexts } from "@/app/utils/flavor-entry";

export const AbilitiesList = ({ pokemonData }: { pokemonData: Pokemon }) => {
    const { language } = useLanguage();
    const [abilities, setAbilities] = useState<FlavorProps[]>([]);

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
                            shortEffect: effectEntry?.short_effect || "",
                        };
                    } catch (error) {
                        console.error("Error fetching ability:", error);
                        return null;
                    }
                })
            );

            setAbilities(abilityDetails.filter((ab): ab is FlavorProps => ab !== null));
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
