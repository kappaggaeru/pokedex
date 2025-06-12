"use client";

import PokedexListComponent from "./pokedex-list-component";

const HomeComponent: React.FC = () => {
    return (
        <div className="h-[80vh] w-full bg-green-200 p-[1rem]">
            <PokedexListComponent />
        </div>
    );
};

export default HomeComponent;