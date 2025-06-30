import { SettingCardProps } from "@/app/models/props/setting-card.props";
import { SettingCardComponent } from "../card/setting-card.component";

const arraySettings: SettingCardProps[] = [
    {
        title: "change language"
    },
    {
        title: "manage cookies"
    }
];

const settings = arraySettings.map((e, index) => (
    <SettingCardComponent key={index} title={e.title} />
));

export const SettingsComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        {settings}
    </div>
);