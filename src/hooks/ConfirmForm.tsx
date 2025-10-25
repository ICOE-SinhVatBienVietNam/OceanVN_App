import React, { createContext, useContext, useState, ReactNode } from "react"

type ConfirmOptions = {
    title?: string
    message?: string
}

type ConfirmContextType = {
    confirmForm: (options?: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export const useConfirm = () => {
    const context = useContext(ConfirmContext)
    if (!context) throw new Error("useConfirm must be used within ConfirmProvider")
    return context.confirmForm
}

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("Vui lòng xác nhận")
    const [message, setMessage] = useState("Hành động của bạn sẽ không thể khôi phục.")
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null)

    const confirmForm = (options?: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setTitle(options?.title || "Vui lòng xác nhận")
            setMessage(options?.message || "Hành động của bạn sẽ không thể khôi phục.")
            setResolver(() => resolve)
            setIsOpen(true)
        })
    }

    const handleCancel = () => {
        setIsOpen(false)
        resolver?.(false)
    }

    const handleConfirm = () => {
        setIsOpen(false)
        resolver?.(true)
    }

    return (
        <ConfirmContext.Provider value={{ confirmForm }}>
            {children}

            {isOpen && (
                <div className="mainShadow fixed inset-0 z-[9000] flex items-center justify-center bg-black/75">
                    <div className="bg-white p-6 w-[90%] max-w-md shadow-xl text-center rounded-main">
                        <h2 className="text-lg font-semibold mb-3">{title}</h2>
                        <p className="text-sm text-gray-600 mb-6">{message}</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4! py-2! rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-4! py-2! rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Tiếp tục
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    )
}
