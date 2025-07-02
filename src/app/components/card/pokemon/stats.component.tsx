import { Stat } from "@/app/models/dto/stat.model"
import { StatBar } from "./stat-bar.component";
import { formatText } from "@/app/utils/stringUtils";
import { StatBarProps } from "@/app/models/props/pokedex-stat.props";

type Props = {
    stats: Stat[];
}

const statsColors: StatBarProps["color"][] = [
    "green", "red", "blue", "violet", "lightblue", "yellow"
];

export const StatsComponent: React.FC<Props> = ({ stats }) => {
    return (
        <div>
            {
                stats.map((stat, index) => (
                    <StatBar
                        key={stat.stat.name}
                        title={formatText(stat.stat.name ?? "", "-")}
                        value={stat.base_stat}
                        color={statsColors[index % statsColors.length]}
                    />
                ))
            }
        </div>
    )
}