import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
    showModal: boolean;
    toggleModal: (sector?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: {children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prevShowModal => {
            return !prevShowModal;
        })
    };

    return (
        <ModalContext value={{ showModal, toggleModal }}>
            {children}
        </ModalContext>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
}