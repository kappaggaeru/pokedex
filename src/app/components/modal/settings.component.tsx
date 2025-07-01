import { SettingCardProps } from "@/app/models/props/setting-card.props";
import { SettingCardComponent } from "../card/setting-card.component";
import { CookiesSettingsComponent } from "../settings/cookies-settings.component";
import { LanguageSettingsComponent } from "../settings/language-settings.component";

const arraySettings: SettingCardProps[] = [
    {
        title: "change language",
        children: <LanguageSettingsComponent />
    },
    {
        title: "manage cookies",
        children: <CookiesSettingsComponent />
    }
];

const settings = arraySettings.map((e, index) => (
    <SettingCardComponent key={index} title={e.title} children={e.children} />
));

export const SettingsComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        {settings}
    </div>
);