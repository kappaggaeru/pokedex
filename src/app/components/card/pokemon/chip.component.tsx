import { typeColorMap } from "../../../consts/type-color-map";

type ChipProps = {
    title: string;
}

export const ChipComponent: React.FC<ChipProps> = ({ title }) => {
    const type = title.toLocaleLowerCase();
    const colors = typeColorMap[type] ?? { text: 'text-gray-700', bg: 'bg-gray-100' };
    return (
        <div className={`${colors.bg} ${colors.text} rounded-xl text-center w-fit px-[1rem] capitalize`}>
            <span>{title}</span>
        </div>
    );
}