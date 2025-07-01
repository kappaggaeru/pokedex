import { SettingCardComponent } from "../card/setting-card.component";
import { CookiesSettingsComponent } from "../settings/cookies-settings.component";
import { LanguageSettingsComponent } from "../settings/language-settings.component";

export const SettingsComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        <SettingCardComponent title="change language">
            <LanguageSettingsComponent></LanguageSettingsComponent>
        </SettingCardComponent>
        <SettingCardComponent title="manage cookies">
            <CookiesSettingsComponent></CookiesSettingsComponent>
        </SettingCardComponent>
    </div>
);