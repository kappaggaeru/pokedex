"use client";

import React, { useState } from "react";
import PokedexItemContainer from "./pokedex-item-container.component";
import { getSprite } from "../services/pokemon.service";

type Props = {
  onSelect: (id: number) => void;
};

const PokedexListComponent: React.FC<Props> = ({ onSelect }) => {
  const [viewedMap, setViewedMap] = useState<Record<number, string>>({});

  const handleSelect = async (id: number) => {
    onSelect(id);
    if (viewedMap[id]) return;
    try {
      const blob = await getSprite(id);
      const objectURL = URL.createObjectURL(blob);
      setViewedMap((prev) => ({
        ...prev,
        [id]: objectURL,
      }));
    } catch (error) {
      console.error("Error fetching sprite", error);
    }
  };

  const pokedexItems = Array.from({ length: 300 }, (_, i) => {
    const id = i + 1;
    return (
      <PokedexItemContainer
        key={id}
        id={id}
        sprite={viewedMap[id] ?? null}
        viewed={!!viewedMap[id]}
        onSelect={handleSelect}
      />
    );
  });

  return (
    <div className="flex flex-wrap justify-center gap-[1rem] p-2">
      {pokedexItems}
    </div>
  );
};

export default PokedexListComponent;
