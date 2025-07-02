import { CookiesSettingsComponent } from "../settings/cookies-settings.component";

export const CookiesComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        <CookiesSettingsComponent></CookiesSettingsComponent>
    </div>
);