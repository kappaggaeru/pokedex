import { createContext, ReactNode, useContext, useState } from "react";

type Artwork = {
    pathOriginal: string;
    pathShiny: string;
    title: string;
}

interface ModalContextType {
    showModal: boolean;
    showModalArtwork: boolean;
    artwork: Artwork | null,
    toggleModal: () => void;
    toggleModalArtwork: () => void;
    setArtworkData: (original: string, shiny: string, title: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalArtwork, setShowModalArtwork] = useState(false);
    const [artwork, setArtwork] = useState<Artwork | null>(null);

    const toggleModal = () => {
        setShowModal(prevShowModal => {
            return !prevShowModal;
        })
    };

    const toggleModalArtwork = () => {
        setShowModalArtwork(prevShowModal => {
            return !prevShowModal;
        })
    }

    const setArtworkData = (original: string, shiny: string, title: string) => {
        setArtwork({
            pathOriginal: original,
            pathShiny: shiny,
            title: title
        });
    }

    return (
        <ModalContext value={{
            showModal,
            showModalArtwork,
            artwork,
            toggleModal,
            toggleModalArtwork,
            setArtworkData
        }}>
            {children}
        </ModalContext>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
}