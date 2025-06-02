"use client";

import ColorSelectorComponent from "./color-selector-component";
import PokedexItem from "./pokedex-item-component";
import TypeSelectorComponent from "./type-selector-component";

const HomeComponent: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-500">
            <TypeSelectorComponent />
            <ColorSelectorComponent />
            <PokedexItem />
        </div>
    );
};

export default HomeComponent;