import { Generic } from "@/app/models/dto/generic.model"
import { getItemSprite } from "@/app/services/pokemon.service"
import { formatText } from "@/app/utils/stringUtils"
import { ArrowBigUpDash, Repeat } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
    level: number,
    to: string,
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
    to,
    trigger,
    item,
    minHappiness,
    minAffection,
    daytime,
    location,
    knownTypeMove
}) => {
    const [itemSprite, setItemSprite] = useState("");
    const itemFormatted = formatText(item?.name ?? "", '-');

    const renderTriggerText = () => {
        if (minHappiness !== 0 && daytime !== '') {
            return `Requires a happiness level of ${minHappiness}, then level up during the ${formatText(daytime, '-')} to evolve`;
        }
        if (trigger == "use-item") {
            return `Requires using ${itemFormatted} to evolve`;
        }
        if (trigger == "mixed") {
            return `Requires leveling up at the following locations: ${renderLocations()}, or using ${itemFormatted}`;
        }
        if (minAffection > 0 || minHappiness > 0 && knownTypeMove !== null) {
            return `Requires a happiness level of ${minHappiness}, or an affection level of ${minAffection} or knowing the move ${formatText(knownTypeMove?.name ?? "", "-", true)}`;
        }
        if (trigger == "trade") {
            return `Requires being traded to evolve`;
        }
        if (level !== 0) {
            return `Requires reaching level ${level} to evolve`;
        }
        return `Requires ${trigger} to evolve`;
    }

    const renderIcon = () => {
        if (trigger == "level-up") {
            return <ArrowBigUpDash className="w-12 h-12" />
        }
        if (trigger == "trade") {
            return <Repeat className="w-12 h-12" />
        }
        if (itemSprite) {
            return <img src={itemSprite} alt={trigger} className="w-12 h-12 " />
        }
    }

    const renderLocations = (): string => {
        let res = "";
        location.forEach((e, index) => {
            if (index < location.length -1) {
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
        <div className="
            flex flex-row gap-4 rounded-lg p-4 items-center
            bg-slate-50 dark:bg-slate-700/70 text-gray-400
            border border-slate-100 dark:border-gray-600/50
        ">
            <div className="p-4 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                <div className="w-6 h-6 text-slate-500 flex justify-center items-center">
                    {renderIcon()}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-md bolder text-gray-600 dark:text-gray-300 capitalize">{to}</div>
                <div className="text-gray-400 text-sm">
                    {renderTriggerText()}
                </div>
            </div>
        </div>
    )
}