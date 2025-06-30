import { SettingCardProps } from "@/app/models/props/setting-card.props";

export const SettingCardComponent: React.FC<SettingCardProps> = ({title}) => {
    return (
        <div className="
        bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700
        border border-gray-200/50 dark:border-gray-600/50 p-4 rounded-lg cursor-pointer">
            <h5 className="capitalize text-gray-500 dark:text-gray-400">{title}</h5>
        </div>
    );
}