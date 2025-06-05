"use client";

import PokedexListComponent from "./pokedex-list-component";
import PokemonCardComponent from "./pokemon-card-component";

const HomeComponent: React.FC = () => {
    return (
        <div className="border-2 border-red-500 border-dashed grid grid-cols-2 grid-rows-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-10">
            <PokedexListComponent />
            <PokemonCardComponent />
        </div>
    );
};

export default HomeComponent;