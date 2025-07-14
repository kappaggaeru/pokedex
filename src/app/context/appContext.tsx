import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { PokemonProvider } from './pokemonContext';
import { AchievementsProvider } from './achievementsContext';
import { ModalProvider } from './modalContext';
import { ThemeProvider } from './themeContext';
import { LanguageProvider } from './languageContext';
import { AccesibilityProvider } from './accesibilityContext';
import { useAchievementTrigger } from '../hooks/useAchievementTrigger';

// Componente wrapper que usa ambos contextos
const AchievementTriggerWrapper = ({ children }: { children: ReactNode }) => {
    // Usar import normal en lugar de require dinámico
    useAchievementTrigger();

    return <>{children}</>;
};

const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <CookiesProvider>
            <AchievementsProvider>
                <PokemonProvider>
                    <AchievementTriggerWrapper>
                        <ModalProvider>
                            <ThemeProvider>
                                <LanguageProvider>
                                    <AccesibilityProvider>
                                        {children}
                                    </AccesibilityProvider>
                                </LanguageProvider>
                            </ThemeProvider>
                        </ModalProvider>
                    </AchievementTriggerWrapper>
                </PokemonProvider>
            </AchievementsProvider>
        </CookiesProvider>
    );
};

export default AppProviders;