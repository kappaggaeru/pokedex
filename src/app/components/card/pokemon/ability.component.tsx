import { AbilityProps } from "./ability-list.component";

export const AbilityComponent: React.FC<AbilityProps> = ({ name, effect, shortEffect }) => {
    return (
        <div className="rounded-lg border border-gray-200/50 dark:border-gray-600/50 p-4">
            <h1 className="text-lg bolder capitalize">{name}</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">{effect}</p>
            {/* <span className="text-sm text-gray-400 dark:text-gray-500">{shortEffect}</span> */}
        </div>
    );
}