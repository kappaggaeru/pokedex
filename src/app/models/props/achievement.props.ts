export type AchievementProps = {
    title: string;
    description: string;
    goal: number;
    captureList?: number[];
    hasCookie?: string;
    completed: boolean;
}