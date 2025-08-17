"use client";

import React, { useEffect, useState } from "react";
import PokedexListComponent from "./list/pokedex-list.component";
import PokemonCardComponent from "./card/pokemon-card.component";
import DefaultButton from "../buttons/default.button";
import { ArrowUp } from "lucide-react";
import { MenuComponent } from "./menu/menu.component";
import { useMenu } from "../context/menuContext";
import { useIsMobile } from "../hooks/useIsMobile";
import { usePokemon } from "../context/pokemonContext";
import { scrollToTop } from "../utils/scroll";
import { useAccesibility } from "../context/accesibilityContext";
import { NotificationsComponent } from "./notifications.component";
import { CookieCardComponent } from "./card/cookie-card.component";
import { ModalComponent } from "./modal/modal.component";
import { useModal } from "../context/modalContext";
import { ModalArtworkComponent } from "./modal/modal-artwork.component";

const HomeComponent: React.FC = () => {
    const { selectedId, selectedPokemon } = usePokemon();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { showMenu } = useMenu();
    const isMobile = useIsMobile();
    const { enabledAnimations } = useAccesibility();
    const { toggleModal, showModalArtwork } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if ((isMobile && showMenu) || showModalArtwork) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobile, showMenu, showModalArtwork]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.ctrlKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                toggleModal();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleModal]);

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
                    <MenuComponent isOpen={showMenu} />
                    <ModalComponent />
                    <ModalArtworkComponent />
                    <CookieCardComponent />
                    <NotificationsComponent />
                </div>
                <DefaultButton onClick={scrollToTop} isVisible={showScrollTop} icon={ArrowUp} className={`fixed bottom-5 right-5 z-20 ${enabledAnimations ? "animate-bounce" : ""}`} />
            </div>
        </div>
    );
};

export default HomeComponent;
