"use client";
import { useAchievements } from "@/app/context/achievementsContext";
import { usePokemon } from "@/app/context/pokemonContext";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const CookiesSettingsComponent: React.FC = () => {
    const hasMounted = useHasMounted();
    const [cookies] = useCookies(["capturedList"]);
    const [captured, setCaptured] = useState("");
    const [capturedAsh, setCapturedAsh] = useState("");
    const { clearCapturedList, ashCapturedList } = usePokemon();
    const {
        clearAchievements,
        capturedCount,
    } = useAchievements();

    useEffect(() => {
        if (hasMounted) {
            const cookieValue = cookies.capturedList || "";
            setCaptured(cookieValue);

            let ashList = "";
            ashCapturedList.map((pokemon) => {
                ashList += `${pokemon},`;
            });
            setCapturedAsh(ashList);
        }
    }, [cookies.capturedList, hasMounted, ashCapturedList]);

    const handleClearList = () => {
        const confirmed = window.confirm("Are you sure you want to delete all the cookies?");
        if (confirmed) {
            clearAchievements();
            clearCapturedList();
            setTimeout(() => {
                window.location.reload();
            }, 100); // da tiempo a que se borren completamente
        }
    }


    if (!hasMounted) return null;

    return (
        <div className="flex flex-col gap-4 cursor-default">
            <div className="text-gray-500 dark:text-gray-400">
                <h3>This site uses cookies to keep track of captured Pokémon in order to complete achievements.</h3>
            </div>
            <div className="text-gray-500 dark:text-gray-400 flex flex-col gap-4">
                <p>Captured pokemon: {capturedCount}</p>
                <textarea
                    name="capturedList"
                    id="capturedList"
                    value={captured}
                    onChange={() => { }}
                    className="border border-gray-200/50 dark:border-gray-600/50 w-full h-40 bg-white dark:bg-slate-800 rounded-md p-4"
                />
                <p>Captured Ash pokemon: {ashCapturedList.length}</p>
                <textarea
                    name="capturedAshList"
                    id="capturedAshList"
                    value={capturedAsh}
                    onChange={() => { }}
                    className="border border-gray-200/50 dark:border-gray-600/50 w-full h-20 bg-white dark:bg-slate-800 rounded-md p-4"
                />
                <div
                    onClick={handleClearList}
                    className="w-full
                        border border-gray-200/50 dark:border-gray-600/50 p-2 px-6 rounded-md cursor-pointer text-center
                        bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600
                        text-gray-100 hover:text-gray-100 dark:text-gray-100 dark:hover:text-gray-100"
                >
                    <h5>Delete all cookies</h5>
                </div>
            </div>
        </div>
    );
}