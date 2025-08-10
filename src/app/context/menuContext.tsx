import { createContext, ReactNode, useContext, useState } from "react";

interface MenuContextType {
    showMenu: boolean;
    toggleMenu: (sector?: string) => void;
    activeSector: string;
}


const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: {children: ReactNode }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [activeSector, setActiveSector] = useState("");

    const toggleMenu = (sector?: string) => {
        if (sector) {
            setActiveSector(sector);
        }
        setShowMenu(prevShowMenu => {
            return !prevShowMenu;
        })
    };

    return (
        <MenuContext value={{ showMenu, toggleMenu, activeSector }}>
            {children}
        </MenuContext>
    );
}

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within MenuProvider");
    return context;
}