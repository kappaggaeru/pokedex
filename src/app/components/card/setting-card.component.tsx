import { SettingCardProps } from "@/app/models/props/setting-card.props";

export const SettingCardComponent: React.FC<SettingCardProps> = ({title}) => {
    return (
        <div className="border border-gray-200/50 dark:border-gray-600/50 p-4 rounded-lg cursor-pointer">
            <h5 className="capitalize text-black dark:text-gray-400">{title}</h5>
        </div>
    );
}