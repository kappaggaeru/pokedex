"use client";

import React, { useEffect, useState } from "react";
import PokedexListComponent from "./list/pokedex-list.component";
import PokemonCardComponent from "./card/pokemon-card.component";
import DefaultButton from "../buttons/default.button";
import { ArrowUp } from "lucide-react";
import { ModalComponent } from "./modal/modal.component";
import { useModal } from "../context/modalContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePokemon } from "../context/pokemonContext";
import { scrollToTop } from "../utils/scroll";
import { useAccesibility } from "../context/accesibilityContext";

const HomeComponent: React.FC = () => {
    const { selectedId, selectedPokemon } = usePokemon();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { showModal } = useModal();
    const isMobile = useIsMobile();
    const { enabledAnimations } = useAccesibility();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobile && showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobile, showModal]);

    return (
        <div>
            <div className={`overflow-auto mb-20 mt-20`}>
                <div className="overflow-auto grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-4">
                    <div className={`col-span-1 md:col-span-2 xl:col-span-5 overflow-auto ${selectedId ? "hidden" : "block"} md:block md:mx-4 mx-6`}>
                        <PokedexListComponent />
                    </div>
                    <div className={`col-span-1 md:col-span-2 xl:col-span-3 overflow-auto ${selectedId ? "block" : "hidden"} md:block`}>
                        <PokemonCardComponent
                            key={selectedPokemon?.id}
                        />
                    </div>
                    <ModalComponent isOpen={showModal}>
                    </ModalComponent>
                </div>
                <DefaultButton onClick={scrollToTop} isVisible={showScrollTop} icon={ArrowUp} className={`fixed bottom-5 right-5 z-20 ${enabledAnimations ? "animate-bounce" : ""}`} />
            </div>
        </div>
    );
};

export default HomeComponent;
