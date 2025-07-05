export const scrollToTop = (delay = 100) => {
    if (typeof window !== "undefined") {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, delay);
    }
};
