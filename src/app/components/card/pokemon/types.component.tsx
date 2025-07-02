import { Type } from "@/app/models/dto/type.model";
import { ChipComponent } from "./chip.component";

type Props = {
    types: Type[];
}

export const TypesContainerComponent: React.FC<Props> = ({ types }) => {
    return (
        <div className="flex flex-row gap-2">
            {
                types.map((e, index) => (
                    <ChipComponent
                        key={index}
                        title={e.type.name ?? ''}
                    />
                ))
            }
        </div>
    )
}