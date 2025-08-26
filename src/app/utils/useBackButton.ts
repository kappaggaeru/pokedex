import { useEffect } from "react";

export default function useBackButton(selectedId: number | null, clearPokemonCard: () => void) {
    useEffect(() => {
        if (selectedId !== null) {
            window.history.pushState({ modalOpen: true }, "");
        }

        const handlePopState = () => {
            if (selectedId !== null) {
                clearPokemonCard();
                window.history.pushState(null, "");
            }
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [selectedId, clearPokemonCard]);
}
