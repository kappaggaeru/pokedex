import { createContext, ReactNode, useContext } from "react";
import { PokemonProvider } from "./pokemonContext";
import { ModalProvider } from "./modalContext";
import { ThemeProvider } from "./themeContext";
import { CookiesProvider } from "react-cookie";
import { LanguageProvider } from "./languageContext";

const PokemonContext = createContext(undefined);
const MenuContext = createContext(undefined);
const ModalContext = createContext(undefined);
const ThemeContext = createContext(undefined);

export const usePokemon = () => useContext(PokemonContext);
export const useMenu = () => useContext(MenuContext);
export const useModal = () => useContext(ModalContext);
export const useTheme = () => useContext(ThemeContext);

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            <PokemonProvider>
                <ModalProvider>
                    <ThemeProvider>
                        <LanguageProvider>
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </ModalProvider>
            </PokemonProvider>
        </CookiesProvider>
    )
}

export default AppProviders;