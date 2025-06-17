import { MoveRight } from 'lucide-react';
import { MoveLeft } from 'lucide-react';

const IdNavigatorButton = ({ prevPokemon, id, nextPokemon }: { prevPokemon: () => void; id: number; nextPokemon: () => void }) => {
    return (
        <div className="shadow-xl p-[1rem] m-[1rem] rounded-xl flex flex-row justify-between ">
            <div className="bg-slate-200 p-[1rem] rounded-md cursor-pointer text-black" onClick={prevPokemon}>
                <MoveLeft className="w-6 h-6" />
            </div>
            <div className="bg-slate-200 p-[1rem] px-[2rem] rounded-md text-black font-bold text-xl">
                <span>{id}</span>
            </div>
            <div className="bg-slate-200 p-[1rem] rounded-md cursor-pointer text-black" onClick={nextPokemon}>
                <MoveRight className="w-6 h-6" />
            </div>
        </div>
    );
}

export default IdNavigatorButton;