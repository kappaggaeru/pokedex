import { useEffect, useState, useCallback } from "react";
import { useAchievements } from "../context/achievementsContext";
import { AchievementProps } from "../models/props/achievement.props";
import { AchievementCardComponent } from "./card/achievement-card.component";
import { NotificationCardComponent } from "./card/notification-card.component";

interface NotificationState {
    id: string;
    notification: AchievementProps;
    isVisible: boolean;
    isClosing: boolean;
}

export const NotificationsComponent = () => {
    const { notifications, removeNotification } = useAchievements();
    const [notificationStates, setNotificationStates] = useState<NotificationState[]>([]);

    // Generar ID único para cada notificación
    const generateNotificationId = useCallback((notification: AchievementProps, index: number) => {
        return `notification-${index}-${notification.title}-${Date.now()}`;
    }, []);

    // Efecto para agregar nuevas notificaciones
    useEffect(() => {
        const currentIds = new Set(notificationStates.map(state => state.id));
        
        const newNotificationStates: NotificationState[] = notifications.map((notification, index) => {
            const id = generateNotificationId(notification, index);
            
            // Si ya existe una notificación con el mismo contenido, mantenerla
            const existingState = notificationStates.find(state => 
                state.notification.title === notification.title && 
                state.notification.description === notification.description
            );
            
            if (existingState && currentIds.has(existingState.id)) {
                return existingState;
            }
            
            // Nueva notificación
            return {
                id,
                notification,
                isVisible: true,
                isClosing: false
            };
        });

        setNotificationStates(newNotificationStates);
    }, [notifications, generateNotificationId]);

    // Función para iniciar el cierre de una notificación
    const handleClose = useCallback((notificationId: string, originalIndex: number) => {
        setNotificationStates(prevStates => 
            prevStates.map(state => 
                state.id === notificationId 
                    ? { ...state, isClosing: true, isVisible: false }
                    : state
            )
        );

        // Después de un delay para la animación, eliminar del contexto
        setTimeout(() => {
            removeNotification(originalIndex);
            // Limpiar el estado local también
            setNotificationStates(prevStates => 
                prevStates.filter(state => state.id !== notificationId)
            );
        }, 300); // Ajusta este tiempo según la duración de tu animación de cierre
    }, [removeNotification]);

    // Renderizar solo las notificaciones visibles
    const renderedNotifications = notificationStates.map((state, index) => (
        <div 
            key={state.id}
            style={{ 
                display: state.isVisible ? 'block' : 'none',
                opacity: state.isClosing ? 0 : 1,
                transition: 'opacity 0.3s ease-out'
            }}
        >
            <NotificationCardComponent
                duration={5000}
                onClose={() => handleClose(state.id, index)}
            >
                <AchievementCardComponent
                    title={state.notification.title}
                    desc={state.notification.description}
                    goal={state.notification.goal}
                    onClick={() => {}}
                />
            </NotificationCardComponent>
        </div>
    ));

    return (
        <div className="
            fixed bottom-0 left-0 md:right-0 h-fit z-40
            p-4 pt-0 sm:pr-0
            w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
        ">
            <div className="flex flex-col justify-end gap-4 h-full opacity-100">
                {renderedNotifications}
            </div>
        </div>
    );
}