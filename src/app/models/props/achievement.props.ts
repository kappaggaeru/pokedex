import { LucideIcon } from "lucide-react";

export type AchievementProps = {
    id: number;
    title: string;
    description: string;
    image?: string;
    icon?: LucideIcon;
    goal: number;
    capturedCount?: number;
    type: "capture_count" | "first_legendary" | "first_mythical" | "capture_specific" | "special";
    hasCookie?: string;
    completed: boolean;
    completedAt?: Date | null | undefined;
};