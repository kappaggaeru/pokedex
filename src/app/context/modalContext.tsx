import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
    showModal: boolean;
    currentModal: string;
    toggleModal: () => void;
    setActiveModal: (modal: string) => void;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: {children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState("");

    const toggleModal = () => {
        setShowModal(prevShowModal => {
            return !prevShowModal;
        })
    };

    const setActiveModal = (modal: string) => {
        setCurrentModal(modal);
    }

    return (
        <ModalContext value={{ showModal, currentModal, toggleModal, setActiveModal }}>
            {children}
        </ModalContext>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
}