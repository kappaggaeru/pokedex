import { createContext, ReactNode, useContext } from "react";
import { PokemonProvider } from "./pokemonContext";
import { MenuProvider } from "./menuContext";
import { ModalProvider } from "./modalContext";
import { ThemeProvider } from "./themeContext";

const PokemonContext = createContext(undefined);
const MenuContext = createContext(undefined);
const ModalContext = createContext(undefined);
const ThemeContext = createContext(undefined);

export const usePokemonTier = () => useContext(PokemonContext);
export const useMenu = () => useContext(MenuContext);
export const useModal = () => useContext(ModalContext);
export const useTheme = () => useContext(ThemeContext);

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <PokemonProvider>
            <MenuProvider>
                <ModalProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </ModalProvider>
            </MenuProvider>
        </PokemonProvider>
    )
}

export default AppProviders;