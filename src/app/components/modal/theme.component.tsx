import { Gamepad, Laptop, Moon, Sun } from "lucide-react";
import { ThemeCardComponent } from "../card/theme-card.component";
import { ThemeCardProps } from "@/app/models/props/theme-card.props";

const entries: ThemeCardProps[] = [
    {
        title: "light",
        icon: Sun,
        enabled: true
    },
    {
        title: "dark",
        icon: Moon,
        enabled: true
    },
    {
        title: "system",
        icon: Laptop,
        enabled: true
    },
    {
        title: "retro",
        icon: Gamepad,
        enabled: false
    },
];

const fullEntries = entries.map((entry, index) => (
    <ThemeCardComponent key={index} title={entry.title} icon={entry.icon} enabled={entry.enabled} />
));

export const ThemeComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        {fullEntries}
    </div>
)