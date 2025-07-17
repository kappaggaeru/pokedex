import { useEffect, useState, useCallback } from "react";
import { useAchievements } from "../context/achievementsContext";
import { AchievementProps } from "../models/props/achievement.props";
import { AchievementCardComponent } from "./card/achievement-card.component";
import { NotificationCardComponent } from "./card/notification-card.component";
import { LockOpen } from "lucide-react";

interface NotificationState {
    id: number; // Usar el ID real del achievement
    notification: AchievementProps;
    isVisible: boolean;
    isClosing: boolean;
    timestamp: number; // Para evitar duplicados
}

export const NotificationsComponent = () => {
    const { notifications, removeNotification } = useAchievements();
    const [notificationStates, setNotificationStates] = useState<NotificationState[]>([]);

    // Efecto para agregar nuevas notificaciones
    useEffect(() => {
        console.log('Notifications updated:', notifications);

        notifications.forEach(notification => {
            const existingNotification = notificationStates.find(
                state => state.id === notification.id && !state.isClosing
            );

            // Solo agregar si no existe ya
            if (!existingNotification) {
                const newNotificationState: NotificationState = {
                    id: notification.id,
                    notification,
                    isVisible: true,
                    isClosing: false,
                    timestamp: Date.now()
                };

                setNotificationStates(prevStates => {
                    // Filtrar cualquier notificación duplicada del mismo achievement
                    const filteredStates = prevStates.filter(state => state.id !== notification.id);
                    return [...filteredStates, newNotificationState];
                });
            }
        });
    }, [notifications]);

    // Función para iniciar el cierre de una notificación
    const handleClose = useCallback((notificationId: number) => {
        console.log('Closing notification:', notificationId);

        setNotificationStates(prevStates =>
            prevStates.map(state =>
                state.id === notificationId
                    ? { ...state, isClosing: true, isVisible: false }
                    : state
            )
        );

        // Después de un delay para la animación, eliminar del contexto
        setTimeout(() => {
            removeNotification(notificationId);
            // Limpiar el estado local también
            setNotificationStates(prevStates =>
                prevStates.filter(state => state.id !== notificationId)
            );
        }, 300);
    }, [removeNotification]);

    // Renderizar solo las notificaciones visibles
    const renderedNotifications = notificationStates
        .filter(state => state.isVisible && !state.isClosing)
        .map((state) => (
            <div
                key={`notification-${state.id}-${state.timestamp}`}
                style={{
                    opacity: state.isClosing ? 0 : 1,
                    transition: 'opacity 0.3s ease-out'
                }}
            >
                <NotificationCardComponent
                    duration={5000}
                    onClose={() => handleClose(state.id)}
                >
                    <AchievementCardComponent
                        title={"New Achievement Unlocked!"}
                        desc={state.notification.title}
                        goal={0}
                        idCapture={0}
                        image=""
                        type=""
                        icon={LockOpen}
                        isSpecial={false}
                        isNotification={true}
                        onClick={() => { }}
                        isCompleted={false}
                        completedAt={undefined}
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
};