import { ReactNode } from "react"
import CloseModalButton from "../../buttons/close-modal.button"

export const ModalComponent = ({ children, isOpen, title }: { children: ReactNode; isOpen: boolean; title: string }) => {

    return (
        <div className={`
            fixed top-0 bottom-0 right-0 h-screen p-4
            transition-all duration-300 z-50
            text-black dark:text-gray-300
            bg-white dark:bg-slate-800
            border-l border-gray-200/50 dark:border-gray-600/50
            md:rounded-tl-3xl md:rounded-bl-3xl
            shadow-[rgba(0,0,15,0.5)_10px_10px_10px_10px]
            w-full md:w-[50%] lg:w-[40%] xl:w-[30%]
            ${isOpen ? "translate-x-full" : "translate-x-0"}
            `}
        >
            <div className="w-full h-fit mb-4">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="capitalize text-xl text-gray-600 dark:text-gray-400 cursor-default">{title}</h1>
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