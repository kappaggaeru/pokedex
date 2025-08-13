export const FaqComponent: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 cursor-default">
            <div className="flex flex-col gap-4 cursor-default text-gray-500 dark:text-gray-400">
                <h3 className="text-md"><b>Capture Rate</b> — How does it work?</h3>
                <p>The capture rate is the probability of catching a Pok&eacute;mon. It dependes on several factors, the most principal being the Pok&eacute;mon&#39;s HP, any status condition affecting it, its base capture rate, and the type Pok&eacute; Ball used.</p>
                <p>Each game uses a different algorithm to calculate the capture rate based on these variables. However, the formula changes between generations, so the way probabilities are calculated is not the same across all games.</p>
                <p>For example, here is simplified version of the algorithm used in the first generation:</p>
                <p>Each time you throw a Pok&eacute; ball, a random number is generated:</p>
                <ul className="list-disc pl-8">
                    <li>Pok&eacute; Ball: from 0 to 255</li>
                    <li>Great Ball: from 0 to 200</li>
                    <li>Ultra Ball: from 0 to 150</li>
                </ul>
                <p>To this number (<b>A</b>), you add a bonus (<b>B</b>) with a value of 25 if the Pok&eacute;mon is frozen or asleep; 12 if it is poisoned, burned or paralyzed; and 0 in all other cases.</p>
                <p>You catch the Pok&eacute;mon if:</p>
                <span className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                    A - B {'<'} 0
                </span>
                <p>The Pok&eacute;mon escapes if:</p>
                <span className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                    A - B {'>='} 0 and A - B {'>'} Capture Rate
                </span>
                <p>To learn more about the capture rate across generations and games, you can visit these sites:</p>
                <a href="https://www.wikidex.net/wiki/Captura_de_Pok%C3%A9mon#Ratio_de_captura" target="_blank" className="underline decoration-solid">Wikidex Español</a>
                <a href="https://bulbapedia.bulbagarden.net/wiki/Catch_rate" target="_blank" className="underline decoration-solid">Bulbapedia English</a>
            </div>
            <div className="w-full border-t-2 border-slate-100 dark:border-gray-600/50"></div>
            <div className="flex flex-col gap-4 cursor-default text-gray-500 dark:text-gray-400">
                <h3 className="text-md"><b>Gender Rate</b> — How does it work?</h3>
                <p>The percentage shown on the card represents the chance of the Pok&eacute;mon being female.</p>
                <p>This number is calculated by dividing the gender rate by 8 and multiplying by 100. For example, in the case of Jynx, the gender rate is 8.</p>
                <span className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                    (8 / 8) * 100 = 100
                </span>
                <p>Therefore, Jynx will always be female.</p>
                <p>For Pok&eacute;mon like Bulbasaur or any other default species, the gender rate is 1.</p>
                <span className="p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                    (1 / 8) * 100 = 12.5
                </span>
                <p>Therefore there is only a 12.5% chance of Bulbasaur being female — in other words, 1 out of 8 times.</p>
                <p>In special cases such as mythical or legendary Pok&eacute;mon, the gender rate is -1, meaning the Pok&eacute;mon is gender-neutral or genderless.</p>
            </div>
        </div>
    )
}