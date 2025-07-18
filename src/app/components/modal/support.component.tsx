import { useAchievements } from "@/app/context/achievementsContext";

export const SupportComponent: React.FC = () => {
    const { setSpecialAchievement } = useAchievements();

    const handleClick = (platform: string) => {
        console.log(platform);
        setSpecialAchievement(14);
    }

    return (
        <div className="flex flex-col">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col gap-4 cursor-default">
                <p className="font-bold">Support this developer — buy him a coffee!</p>
                <p>This website was built by a single developer. Your support helps fund new features and, of course, coffee!</p>
                <p>If you&#39;re in Argentina, you can use <i>Cafecito</i> to pay in ARS.</p>
                <p>Thank you for your support!</p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <div onClick={() => handleClick("")} className="cursor-pointer w-fit">
                    <a href='https://cafecito.app/kappaggaeru' rel='noopener' target='_blank'>
                        <img
                            srcSet='
                                https://cdn.cafecito.app/imgs/buttons/button_5.png 1x,
                                https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x,
                                https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x'
                            src='https://cdn.cafecito.app/imgs/buttons/button_5.png'
                            alt='Invitame un café en cafecito.app'
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SupportComponent;