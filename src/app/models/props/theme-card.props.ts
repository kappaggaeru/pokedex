import { ThemeOption } from "@/app/context/themeContext";
import { LucideIcon } from "lucide-react";

export interface ThemeCardProps {
    title: ThemeOption;
    icon: LucideIcon;
    enabled: boolean;
}