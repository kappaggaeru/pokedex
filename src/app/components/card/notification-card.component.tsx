import React, { useEffect, useState } from "react";

interface NotificationCardProps {
    children: React.ReactNode;
    duration?: number;
    onClose?: () => void;
}

export const NotificationCardComponent: React.FC<NotificationCardProps> = ({
    children,
    duration = 3000,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // Animar entrada
        const showTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        // Animar salida después de duration
        const hideTimeout = setTimeout(() => {
            setIsLeaving(true);
        }, duration);

        // Remover del DOM después de la animación
        const removeTimeout = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, duration + 500);

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
            clearTimeout(removeTimeout);
        };
    }, [duration, onClose]);

    const handleClick = () => {
        setIsLeaving(true);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    return (
        <div
            className={`
                transform transition-all duration-500 ease-out
                ${isVisible && !isLeaving
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }
                rounded-2xl shadow-lg
                mb-2 cursor-pointer hover:shadow-xl
            `}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};