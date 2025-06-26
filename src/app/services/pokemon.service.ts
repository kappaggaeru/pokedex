const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

// default call to get the total pokemon count and more
export const getPokemonTotalCount = async () => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon count');
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

// get all pokemon types
export const getPokemonTypes = async () => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/type`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon types');
    }
    return response.json();
}

// get pokemon type
export const getPokemonTypeById = async (id: number) => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/type/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon type');
    }
    return response.json();
}

// get all pokemon colors
export const getPokemonColors = async () => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-color`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon colors');
    }
    return response.json();
}

// get pokemon color
export const getPokemonColorById = async (id: number) => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-color/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon color');
    }
    return response.json();
}

// get all pokemon species
export const getPokemonSpecies = async () => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-species`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon species');
    }
    return response.json();
}

// get pokemon species
export const getPokemonSpeciesById = async (id: number) => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-species/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon species');
    }
    return response.json();
}

// get pokemon form
export const getPokemonFormById = async (id: number) => {
    const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon-form/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching pokemon form');
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

export const getSprite = async (id: number) => {
    const response = await fetch(`${SPRITE_BASE_URL}/${id}.png`);
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