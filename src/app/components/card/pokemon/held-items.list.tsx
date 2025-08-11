import { useLanguage } from "@/app/context/languageContext";
import { Effect } from "@/app/models/dto/effect.model";
import { Generic } from "@/app/models/dto/generic.model";
import { Pokemon } from "@/app/models/dto/pokemon.model";
import { getByUrl, getItemSprite } from "@/app/services/pokemon.service";
import { FlavorProps, getFirstFlavorTexts } from "@/app/utils/flavor-entry";
import { useEffect, useState } from "react";
import { HeldItemComponent } from "./held-item-container.component";

export type ItemProps = {
    title: string,
    sprite: string,
    effect: string,
    shortEffect: string,
}

export const HeldItemsList = ({ pokemonData }: { pokemonData: Pokemon }) => {
    const { language } = useLanguage();
    const [items, setItems] = useState<FlavorProps[]>([]);
    const [sprite, setSprite] = useState("");


    useEffect(() => {
        const fetchHeldItems = async () => {
            if (!pokemonData.held_items) return;

            const heldItemDetails = await Promise.all(
                pokemonData.held_items.map(async (heldItemObj: { item: Generic }) => {
                    try {
                        const heldItemData = await getByUrl(heldItemObj.item.url);
                        const blob = await getItemSprite(heldItemObj.item.name ?? "");
                        const objectURL = URL.createObjectURL(blob);

                        const effectEntry = heldItemData.effect_entries.find(
                            (entry: Effect) => entry.language.name === language
                        );

                        const flavorTexts = getFirstFlavorTexts(heldItemData);

                        return {
                            name: heldItemData.name,
                            effect: effectEntry?.effect || flavorTexts[language] || "",
                            shortEffect: effectEntry?.short_effect || "",
                            sprite: objectURL
                        };
                    } catch (error) {
                        console.error("Error fetching item:", error);
                        return null;
                    }
                })
            );

            setItems(heldItemDetails.filter((held): held is FlavorProps & { sprite: string} => held !== null));
        };

        fetchHeldItems();
    }, [pokemonData, language]);

    if (items.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            {items.map((item, index) => (
                <HeldItemComponent
                    key={`${item.name}-${index}`}
                    title={item.name}
                    effect={item.effect}
                    shortEffect={item.shortEffect}
                    sprite={item.sprite ?? ""}
                />
            ))}
        </div>
    );
}