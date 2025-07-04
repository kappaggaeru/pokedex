import { LanguageCardProps } from "@/app/models/props/language-card.props";
import LanguageCardComponent from "../card/language-card.component";

const entries: LanguageCardProps[] = [
    {
        title: "spanish",
        code: "es"
    },
    {
        title: "english",
        code: "en"
    },
    {
        title: "japanese",
        code: "ja"
    }
]

const fullEntries = entries.map((entry, index) => (
    <LanguageCardComponent key={index} title={entry.title} code={entry.code} />
));

export const LanguageComponent: React.FC = () => (
    <div className="flex flex-col gap-4">
        <p className="text-gray-500 dark:text-gray-400">
            This change affects only the Pokémon data and has no impact on the website&aposs language.
        </p>
        {fullEntries}
    </div>
)