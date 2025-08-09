import { ChipComponent } from "./chip.component";

type Props = {
    tags: string[];
}

export const TagsContainerComponent: React.FC<Props> = ({ tags }) => {
    return (
        <div className="flex flex-row gap-2 flex-wrap">
            {
                tags.map((type, index) => (
                    <ChipComponent
                        key={index}
                        title={type}
                    />
                ))
            }
        </div>
    )
}