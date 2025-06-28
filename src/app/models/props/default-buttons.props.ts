import { LucideIcon } from "lucide-react";

export interface DefaultButtonProps {
    onClick: () => void;
    title?: string;
    isVisible: boolean;
    icon: LucideIcon;
    className?: string;
}