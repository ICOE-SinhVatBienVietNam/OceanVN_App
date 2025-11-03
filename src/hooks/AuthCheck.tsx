import { useIonRouter } from "@ionic/react"
import React, { createContext, useContext, useState, ReactNode } from "react"

// Config
import { routeConfig } from "../config/routeConfig"

type AuthCheckPopupOptions = {
    title?: string
    message?: string
}

type AuthCheckPopupContextType = {
    authCheckPopup: (options?: AuthCheckPopupOptions) => Promise<boolean>
}

const AuthCheckPopupContext = createContext<AuthCheckPopupContextType | undefined>(undefined)

export const useAuthCheckPopup = () => {
    const context = useContext(AuthCheckPopupContext)
    if (!context) throw new Error("useAuthCheckPopup must be used within ConfirmProvider")
    return context.authCheckPopup
}

export const AuthCheckPopupProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null)
    const router = useIonRouter()

    const authCheckPopup = (options?: AuthCheckPopupOptions) => {
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve)
            setIsOpen(true)
        })
    }

    const handleCancel = () => {
        setIsOpen(false)
        resolver?.(false)
    }

    const handleConfirm = () => {
        router.push(routeConfig.login.root, "root")
        setIsOpen(false)
        resolver?.(true)
    }

    return (
        <AuthCheckPopupContext.Provider value={{ authCheckPopup }}>
            {children}

            {isOpen && (
                <div className="mainShadow fixed inset-0 z-[9000] flex items-center justify-center bg-black/75">
                    <div className="bg-white p-6 w-[90%] max-w-md shadow-xl text-center rounded-main">
                        <h2 className="text-lg font-semibold mb-3">Đăng nhập tài khoản</h2>
                        <p className="text-sm text-gray-600 mb-6">Bạn cần đăng nhập để có thể tiếp tục</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4! py-3.5! rounded-main! text-csNormal font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-4! py-3.5! rounded-main! bg-red-500 text-csNormal font-medium text-white hover:bg-red-600 transition"
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthCheckPopupContext.Provider>
    )
}
