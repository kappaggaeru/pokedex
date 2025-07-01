import { usePokemon } from "@/app/context/pokemonContext";
import { useCookies } from "react-cookie";

export const CookiesSettingsComponent: React.FC = () => {
    const [cookies] = useCookies(["capturedList"]);
    const { clearCapturedList } = usePokemon();

    const handleClearList = () => {
        const confirmed = window.confirm("Are you sure you want to clear the list?");
        if (confirmed) {
            clearCapturedList();
        }
    }

    return (
        <div className="flex flex-col gap-4 cursor-default">
            <div className="text-gray-500 dark:text-gray-400">
                <h3>This site uses cookies to ensure you get the best experience on our website.</h3>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
                <p className="pb-2">Capture list:</p>
                {typeof window !== 'undefined' && (
                    <textarea name="capturedList" id="capturedList" value={cookies.capturedList} onChange={() => { }}
                        className="border border-gray-200/50 dark:border-gray-600/50 w-full bg-white dark:bg-slate-800 rounded-md p-4"
                    />
                )}
                <div onClick={handleClearList} className="w-full
                text-center
                border border-gray-200/50 dark:border-gray-600/50 p-2 px-6 rounded-xl cursor-pointer
                bg-white dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-red-400 
                text-gray-500 hover:text-gray-100 dark:text-gray-400 dark:hover:text-gray-100"
                >
                    <h5>Clear list</h5>
                </div>
            </div>
        </div>
    );
}