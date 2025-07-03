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
    const regex = typeof charToReplace === "string"
        ? new RegExp(charToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g") // escapa y convierte en global RegExp
        : charToReplace;

    let formatted = value.replace(regex, ' ');

    if (capitalizeWords) {
        formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return formatted;
};


export const formatFlavorText = (flavor: string): string => {
    return flavor.replace(/\f/g, ' ').replace(/\n/g, ' ');
}