import { Search } from "lucide-react"
import { useModal } from "../context/modalContext"
import { usePokemon } from "../context/pokemonContext";
import { KeyButton } from "./key.button";

const ToggleModalButton = () => {
    const { toggleModal } = useModal();
    const { tier } = usePokemon();

    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-white/80 dark:bg-slate-800/80 text-gray-500 dark:text-gray-400";

    return (
        <div onClick={() => toggleModal()}
            className={`
                w-full h-12 flex flex-row justify-start items-center md:w-fit ${baseColor}
                transition-all duration-300 md:hover:scale-110 cursor-pointer
                border border-gray-200/50 dark:border-gray-600/50
                shadow-lg backdrop-blur-xl rounded-full p-4
                hover:text-gray-900 dark:hover:text-white
        `}>
            <div className="flex flex-row gap-2 justify-start">
                <Search className="w-6 h-6" />
                <span className="md:hidden">Search</span>
                <span className="hidden md:block">
                    <KeyButton>Ctrl K</KeyButton>
                </span>
            </div>
        </div>

    )
}
export default ToggleModalButton;