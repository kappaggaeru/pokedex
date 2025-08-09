const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const ITEM_SPRITE_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

export const getPokedexData = async () => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokedex/1/`);
    if (!response.ok) {
        throw new Error('Error fetching pokedex data');
    }
    return response.json();
}

// full data of a pokemon
export const getPokemonById = async (id: number) => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon');
    }
    return response.json();
}

export const getArtworkById = async (id: number) => {
    const response = await fetch(`${ARTWORK_BASE_URL}/${id}.png`);
    if (!response.ok) {
        throw new Error('Error fetching artwork');
    }
    return response.blob();
}

export const getShinyArtworkById = async (id: number) => {
    const response = await fetch(`${ARTWORK_BASE_URL}/shiny/${id}.png`);
    if (!response.ok) {
        throw new Error('Error fetching shiny artwork');
    }
    return response.blob();
}

export const getSprite = async (id: number) => {
    const response = await fetch(`${SPRITE_BASE_URL}/${id}.png`);
    if (!response.ok) {
        throw new Error('Error fetching sprite');
    }
    return response.blob();
}

export const getItemSprite = async (name: string) => {
    const response = await fetch(`${ITEM_SPRITE_BASE_URL}/${name}.png`);
    if (!response.ok) {
        throw new Error('Error fetching sprite');
    }
    return response.blob();
}

// generic fetch
export const getByUrl = async (url: string) => {
    const response = await fetch(`${url}`);
    if (!response.ok) {
        throw new Error('Error fetching data');
    }
    return response.json();
}