// src/utils/stringUtils.ts

/**
 * Reemplaza un carácter o patrón en un string y opcionalmente capitaliza cada palabra.
 * 
 * @param value - El string original.
 * @param charToReplace - El carácter o patrón (RegExp o string) a reemplazar.
 * @param capitalizeWords - Si true, capitaliza cada palabra. Default: true.
 * @returns El string formateado.
 */
export const formatText = (
    value: string,
    charToReplace: string | RegExp,
    capitalizeWords: boolean = true
): string => {
    let formatted = value.replace(charToReplace, ' ');

    if (capitalizeWords) {
        formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return formatted;
};
