import { useEffect } from "react";

export default function useBackButton(onBack: () => void) {
    useEffect(() => {
        const handlePopState = () => {
            onBack();
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onBack]);
}
