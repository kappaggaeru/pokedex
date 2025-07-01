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
        <div className="">
            <div className="text-gray-500 dark:text-gray-400">
                <p>Capture list:</p>
                {typeof window !== 'undefined' && (
                    <textarea name="capturedList" id="capturedList" value={cookies.capturedList} onChange={() => { }}
                        className="border border-gray-200/50 dark:border-gray-600/50 w-full bg-white dark:bg-slate-800 rounded-md p-4"
                    />
                )}
            </div>
            <div className="
                w-fit
                border border-gray-200/50 dark:border-gray-600/50 p-2 px-4 rounded-xl cursor-pointer
                bg-white dark:bg-slate-800 hover:bg-red-400 dark:hover:bg-red-400 
                text-gray-500 hover:text-gray-100 dark:text-gray-400 dark:hover:text-gray-100
                "
                onClick={handleClearList}
            >
                <h5 className="capitalize ">Delete all cookies</h5>
            </div>
        </div>
    );
}