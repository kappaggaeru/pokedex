export const FaqComponent: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 cursor-default">
            <div className="flex flex-col gap-4 cursor-default text-gray-500 dark:text-gray-400">
                <h3 className="text-lg">Capture Rate <b>how does it work?</b></h3>
                <p className="">Each time you throw a pokeball a random number is generated</p>
                <ul>
                    <li>from 0 to 255 for pokeball</li>
                    <li>from 0 to 200 for super ball</li>
                    <li>from 0 to 150 for ultra ball</li>
                </ul>
            </div>
            <div className="flex flex-col gap-4 cursor-default text-gray-500 dark:text-gray-400">
                <h3 className="text-lg">Gender Rate <b>how does it work?</b></h3>
                <p className="">The chance of the Pokémon being female, in eighths; or -1 for genderless.</p>
                
            </div>
        </div>
    )
}