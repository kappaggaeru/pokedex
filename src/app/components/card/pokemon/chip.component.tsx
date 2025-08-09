import { tagColorMap } from "../../../consts/tag-color-map";

type ChipProps = {
    title: string;
}

export const ChipComponent: React.FC<ChipProps> = ({ title }) => {
    const tag = title.toLocaleLowerCase();
    const colors = tagColorMap[tag] ?? { text: 'text-gray-700', bg: 'bg-gray-100' };
    return (
        <div className={`${colors.bg} ${colors.text} rounded-xl text-center w-fit px-4 capitalize`}>
            <span>{title}</span>
        </div>
    );
}