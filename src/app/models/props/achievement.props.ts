export type AchievementProps = {
    id: number;
    title: string;
    description: string;
    goal: number;
    type: "capture_count" | "first_legendary" | "first_mythical" | "capture_specific" | "special";
    captureList?: number[];
    hasCookie?: string;
    completed: boolean;
    completedAt?: Date;
};