import { useEffect, useState, useRef } from "react";

export const useInView = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // solo activar una vez
                }
            },
            {
                threshold: 0.15, // Se considera visible si al menos el 15% entra
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, isInView };
};
