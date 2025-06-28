import { createContext, ReactNode, useContext, useState } from "react";

interface MenuContextType {
    showMenu: boolean;
    toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(prevShowMenu => {
            const newShowMenu = !prevShowMenu;

            if (typeof window !== 'undefined') {
                console.log('oculto algo aca??');
            }

            return newShowMenu;
        })
    };

    return (
        <MenuContext value={{ showMenu, toggleMenu }}>
            {children}
        </MenuContext>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within MenuProvider");
    return context;
};