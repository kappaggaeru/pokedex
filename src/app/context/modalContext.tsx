import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
    showModal: boolean;
    toggleModal: (sector: string) => void;
    activeSector: string;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: {children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeSector, setActiveSector] = useState("");

    const toggleModal = (sector?: string) => {
        if (sector) {
            setActiveSector(sector);
        }
        setShowModal(prevShowModal => {
            return !prevShowModal;
        })
    };

    return (
        <ModalContext value={{ showModal, toggleModal, activeSector }}>
            {children}
        </ModalContext>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
}