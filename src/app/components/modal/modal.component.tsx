import { ReactNode } from "react"
import CloseModalButton from "../../buttons/close-modal.button"

export const ModalComponent = ({ children }: { children: ReactNode }) => {

    return (
        <div className="text-black">
            <div className="border flex justify-end">
                <CloseModalButton />
            </div>
            <h1>soy un modal</h1>
            {children}
        </div>
    )
}