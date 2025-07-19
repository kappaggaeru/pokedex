import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

export const CookieCardComponent: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [shouldRender, setShouldRender] = useState<boolean>(false);

    const getCookie = (name: string): string | undefined => {
        if (typeof document === "undefined") return;
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match?.[2];
    };

    const setCookie = (name: string, value: string, days = 365) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    };

    useEffect(() => {
        const cookie = getCookie("cookies_accepted");

        if (cookie === "true" || cookie === "false") {
            return;
        }

        const timeout = setTimeout(() => {
            setShouldRender(true);
            setVisible(true);
        }, 2500); // Delay de 2.5s

        return () => clearTimeout(timeout);
    }, []);

    const handleClick = (accepted: boolean) => {
        setCookie("cookies_accepted", accepted ? "true" : "false");
        setVisible(false);
        setTimeout(() => setShouldRender(false), 300); // tiempo para permitir la animación de salida
    };

    if (!shouldRender) return null;

    return (
        <div
            className={`
                fixed bottom-0 left-0 right-0 mx-auto p-4 m-4 rounded-xl
                shadow-lg backdrop-blur-xl
                bg-white dark:bg-slate-800/90
                w-[90%] sm:w-[50%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
                transition-all duration-500 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
        >
            <div className="flex flex-col gap-4 text-center text-black dark:text-gray-200 ">
                <div className="flex justify-center w-full">
                    <Cookie className="w-6 h-6 text-gray-400" />
                </div>
                <h1 className="font-bold text-xl">We use cookies</h1>
                <p>This site uses cookies to ensure you get the best experience on our website</p>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        onClick={() => handleClick(false)}
                        className="rounded-lg border border-gray-200/50 dark:border-gray-600/50 w-full bg-slate-50 dark:bg-slate-700/70 p-2 text-black dark:text-gray-200 cursor-pointer"
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => handleClick(true)}
                        className="rounded-lg border border-gray-200/50 dark:border-gray-600/50 w-full bg-indigo-500 p-2 text-white cursor-pointer"
                    >
                        Accept cookies
                    </button>
                </div>
            </div>
        </div>
    );
};
