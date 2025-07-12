import { createContext, ReactNode, useContext } from "react";
import { PokemonProvider } from "./pokemonContext";
import { ModalProvider } from "./modalContext";
import { ThemeProvider } from "./themeContext";
import { CookiesProvider } from "react-cookie";
import { LanguageProvider } from "./languageContext";
import { AccesibilityProvider } from "./accesibilityContext";
import { AchievementsProvider } from "./achievementsContext";

const PokemonContext = createContext(undefined);
const ModalContext = createContext(undefined);
const ThemeContext = createContext(undefined);
const LanguageContext = createContext(undefined);
const AccesibilityContext = createContext(undefined);
const AchievementsContext = createContext(undefined);

export const usePokemon = () => useContext(PokemonContext);
export const useModal = () => useContext(ModalContext);
export const useTheme = () => useContext(ThemeContext);
export const useLanguage = () => useContext(LanguageContext);
export const useAccesibility = () => useContext(AccesibilityContext);
export const useAchievements = () => useContext(AchievementsContext);

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            <AchievementsProvider>
                <PokemonProvider>
                    <ModalProvider>
                        <ThemeProvider>
                            <LanguageProvider>
                                <AccesibilityProvider>
                                    {children}
                                </AccesibilityProvider>
                            </LanguageProvider>
                        </ThemeProvider>
                    </ModalProvider>
                </PokemonProvider>
            </AchievementsProvider>
        </CookiesProvider>
    )
}

export default AppProviders;