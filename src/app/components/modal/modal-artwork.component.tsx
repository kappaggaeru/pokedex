import { useModal } from "@/app/context/modalContext";
import { formatText } from "@/app/utils/stringUtils";

export function ModalArtworkComponent() {
    const { showModalArtwork, toggleModalArtwork, artwork } = useModal();

    return (
        <div onClick={toggleModalArtwork}
            className={`
                fixed inset-0 flex justify-center items-center cursor-pointer
                bg-black/85 transition-all duration-300
                ${showModalArtwork ? "z-40 scale-100" : "opacity-0 z-0 pointer-events-none"}
            `}>
            <div
                className={`
                    w-screen h-screen
                    object-contain flex justify-center
                    ${showModalArtwork ? "opacity-100 scale-100 z-50" : "opacity-0 scale-90 pointer-events-none"}
                `}>
                {artwork?.pathOriginal !== "" && (
                    <div className="flex flex-col justify-center items-center h-full gap-4">
                        <div className="w-[90%]">
                            <img
                                src={artwork?.pathOriginal}
                                alt={artwork?.title ?? ""}
                                title={artwork?.title}
                            />
                        </div>
                        <p className="uppercase text-lg text-gray-300">{formatText(artwork?.title ?? "", "-")}</p>
                    </div>
                )
                }
            </div>
        </div>
    )
}