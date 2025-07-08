import { AccesibilityCardComponent } from "../card/accesibility-card.component";

export const AccesibilityComponent: React.FC = () => (
    <div>
        <div className="flex flex-col gap-6">
            <AccesibilityCardComponent type="animations" />
            <AccesibilityCardComponent type="sound" />
        </div>
    </div>
)