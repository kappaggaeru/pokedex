import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { PokemonProvider } from './pokemonContext';
import { AchievementsProvider } from './achievementsContext';
import { MenuProvider } from './menuContext';
import { ThemeProvider } from './themeContext';
import { LanguageProvider } from './languageContext';
import { AccesibilityProvider } from './accesibilityContext';
import { useAchievementTrigger } from '../hooks/useAchievementTrigger';
import { ModalProvider } from './modalContext';

// Componente wrapper que usa ambos contextos
const AchievementTriggerWrapper = ({ children }: { children: ReactNode }) => {
    // Usar import normal en lugar de require dinámico
    useAchievementTrigger();

    return <>{children}</>;
};

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            <AccesibilityProvider>
                <AchievementsProvider>
                    <PokemonProvider>
                        <AchievementTriggerWrapper>
                            <MenuProvider>
                                <ThemeProvider>
                                    <LanguageProvider>
                                        <ModalProvider>
                                            {children}
                                        </ModalProvider>
                                    </LanguageProvider>
                                </ThemeProvider>
                            </MenuProvider>
                        </AchievementTriggerWrapper>
                    </PokemonProvider>
                </AchievementsProvider>
            </AccesibilityProvider>
        </CookiesProvider>
    );
};

export default AppProviders;