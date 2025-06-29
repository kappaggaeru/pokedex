import { Gamepad, Laptop, Moon, Sun } from "lucide-react";
import { ThemeCardComponent } from "../card/theme-card.component";
import { ThemeCardProps } from "@/app/models/props/theme-card.props";


export const ThemeComponent: React.FC = () => {
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
            enabled: false
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

    return (
        <div className="flex flex-col gap-4">
            {fullEntries}
        </div>
    )
}