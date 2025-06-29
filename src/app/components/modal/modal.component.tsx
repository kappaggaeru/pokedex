import { ReactNode } from "react"
import CloseModalButton from "../../buttons/close-modal.button"

export const ModalComponent = ({ children, isOpen, title }: { children: ReactNode; isOpen: boolean; title: string }) => {

    return (
        <div className={`
            fixed top-0 bottom-0 right-0 h-screen p-4
            transition-all duration-300 z-50
            text-black dark:text-gray-300
            bg-gray-50 dark:bg-slate-800
            w-full md:w-[50%] lg:w-[40%] xl:w-[30%]
            ${isOpen ? "translate-x-full" : "translate-x-0"}
            `}
        >
            <div className="w-full h-fit mb-4">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="capitalize text-xl">{title}</h1>
                    <CloseModalButton />
                </div>
            </div>
            <div className="w-full h-[90%]">
                <div className=" overflow-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}