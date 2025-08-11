export type FlavorProps = {
    name: string;
    effect: string;
    shortEffect: string;
    sprite?: string;
};

type Entry = {
    language: { name: string };
    flavor_text: string;
};

type FlavorData = {
    flavor_text_entries: Entry[];
};

type Text = {
    text: string;
}

export function getFirstFlavorTexts(data: FlavorData | Text) {
    const langs = {
        en: "en",
        es: "es",
        ja: ["ja", "ja-Hrkt"], // japonés puede venir en dos formas
    };

    const result: Record<string, string | undefined> = {
        en: undefined,
        es: undefined,
        ja: undefined,
    };

    if ("flavor_text_entries" in data) {
        for (const entry of data.flavor_text_entries) {
            const lang = entry.language.name;

            if (!result.en && lang === langs.en) {
                result.en = entry.flavor_text;
            }

            if (!result.es && lang === langs.es) {
                result.es = entry.flavor_text;
            }

            if (
                !result.ja &&
                (lang === langs.ja[0] || lang === langs.ja[1])
            ) {
                result.ja = entry.flavor_text;
            }

            if (result.en && result.es && result.ja) break;
        }
    } else if ("text" in data) {
        // If data is of type Text, just set en to the text value
        result.en = data.text;
    }

    return result;
}