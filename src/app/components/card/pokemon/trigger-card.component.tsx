import { usePokemon } from "@/app/context/pokemonContext"
import { Generic } from "@/app/models/dto/generic.model"
import { getItemSprite } from "@/app/services/pokemon.service"
import { formatText } from "@/app/utils/stringUtils"
import { ArrowBigUpDash, Repeat } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
    level: number,
    evolvesTo: string,
    trigger: string,
    item: Generic | null,
    minHappiness: number,
    minAffection: number,
    daytime: string,
    location: string[];
    knownTypeMove: Generic | null;
}
export const TriggerCard: React.FC<Props> = ({
    level,
    evolvesTo,
    trigger,
    item,
    minHappiness,
    minAffection,
    daytime,
    location,
    knownTypeMove
}) => {
    const { tier } = usePokemon();
    const [itemSprite, setItemSprite] = useState("");
    const itemFormatted = formatText(item?.name ?? "", '-');

    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-slate-50 dark:bg-slate-700/80 text-gray-400";

    const renderTriggerText = () => {
        if (minHappiness > 0 && daytime !== '') {
            return `Requires a happiness level of ${minHappiness}, then level up during the ${formatText(daytime, '-')} to evolve`;
        }
        if (trigger == "use-item") {
            return `Requires using ${itemFormatted} to evolve`;
        }
        if (trigger == "mixed") {
            if (location.length > 0) {
                return `Requires leveling up at the following locations: ${renderLocations()}, or using ${itemFormatted} to evolve`;
            }
            if (level > 0) {
                return `Requires reaching level ${level} or using ${itemFormatted} to evolve`;
            }
        }
        if (minAffection > 0 || minHappiness > 0 && knownTypeMove !== null) {
            return `Requires a happiness level of ${minHappiness}, or an affection level of ${minAffection} or knowing the move ${formatText(knownTypeMove?.name ?? "", "-", true)} to evolve`;
        }
        if (trigger == "trade") {
            return `Requires being traded to evolve`;
        }
        if (minHappiness > 0) {
            return `Requires a happiness level of ${minHappiness} to evolve`;
        }
        if (level !== 0) {
            return `Requires reaching level ${level} to evolve`;
        }
        return `Requires ${formatText(trigger ?? "", "-", true)} to evolve`;
    }

    const renderIcon = () => {
        if (trigger == "trade") {
            return <Repeat className="w-12 h-12" />
        }
        if (itemSprite && item) {
            return <img src={itemSprite} alt={itemSprite} className="w-12 h-12 object-contain flex items-center" title={item.name} />
        }
        return <ArrowBigUpDash className="w-12 h-12" />
    }

    const renderLocations = (): string => {
        let res = "";
        location.forEach((e, index) => {
            if (index < location.length - 1) {
                res += `${formatText(e, '-', true)}, `;
            } else {
                res += `${formatText(e, '-', true)}`;
            }
        });
        return res;
    }

    useEffect(() => {
        if (!item?.name) return;

        const loadItemTrigger = async () => {
            try {
                const blob = await getItemSprite(item?.name ?? "");
                const objectURL = URL.createObjectURL(blob);
                setItemSprite(objectURL);
            } catch (e) {
                console.error("Error fetching item sprite", e);
            }
        }

        if (item.url) {
            loadItemTrigger();
        }
    }, [item?.url]);


    return (
        <div className={`
            flex flex-row gap-4 rounded-lg p-4 items-start
            border border-slate-100 dark:border-gray-600/50
            ${baseColor}
        `}>
            <div className={`p-4 border border-slate-100 dark:border-gray-600/50 rounded-lg ${baseColor}`}>
                <div className="w-6 h-6 text-slate-500 flex justify-center items-center">
                    {renderIcon()}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-md bolder text-gray-600 dark:text-gray-300 capitalize">{evolvesTo}</div>
                <div className="text-gray-500 text-sm">
                    {renderTriggerText()}
                </div>
            </div>
        </div>
    )
}