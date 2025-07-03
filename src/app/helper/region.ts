import { GenerationProps } from "../models/props/generation.props";

export const getPokemonRegion = (id: number): GenerationProps => {
    const boundaries = [
        { until: 151, name: "Kanto", roman: "I" },
        { until: 251, name: "Johto", roman: "II" },
        { until: 386, name: "Hoenn", roman: "III" },
        { until: 493, name: "Sinnoh", roman: "IV" },
        { until: 649, name: "Unova", roman: "V" },
        { until: 721, name: "Kalos", roman: "VI" },
        { until: 809, name: "Alola", roman: "VII" },
        { until: 905, name: "Galar", roman: "VIII" },
        { until: 1025, name: "Paldea", roman: "IX" },
    ];

    const region = boundaries.find(b => id <= b.until);
    if (!region) return { name: "N/A", roman: "?" };

    return { name: region.name, roman: region.roman };
};