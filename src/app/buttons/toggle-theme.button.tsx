import { Moon, Sun } from 'lucide-react';
import DefaultButton from './default.button';
import { useTheme } from '../context/themeContext';

const ToggleThemeButton = () => {
    const { toggleThemeLightAndDark, currentTheme } = useTheme();

    return (
        <DefaultButton isVisible={true} icon={currentTheme == "light" ? Sun : Moon} onClick={toggleThemeLightAndDark} />
    );
}
export default ToggleThemeButton;