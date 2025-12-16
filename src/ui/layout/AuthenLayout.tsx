// Import libraries
import { IonPage, IonRouterOutlet } from "@ionic/react"
import React, { lazy, Suspense } from "react"

// Images
import wave from "../../assets/Wave.png"
import oceavn from "../../assets/SinhVatBienVN.png"
import { Link, Redirect, Route } from "react-router-dom"
import { Bounce, ToastContainer } from "react-toastify"

interface WrapperProps {
    form: React.ComponentType<any>; // nhận component bất kỳ
}

// Main component
const AuthenLayout: React.FC<WrapperProps> = ({ form: Form }) => {
    return (
        <IonPage>
            <div className="relative h-full w-full flex items-end-safe">
                <img src={wave} className="w-full" />
                <div className="absolute top-0 left-0 h-full w-full flex flex-col item gap-5 pt-15">
                    <span className="flex flex-col items-center-safe">
                        <img src={oceavn} className="w-[25%]" />
                    </span>

                    <span className="flex-1 w-full flex justify-center-safe px-5">
                        <Form />
                    </span>

                    <div className="absolute h-fit w-full flex justify-center-safe bottom-5 left-1/2 translate-x-[-50%]">
                        <p className="text-white text-csSmall">Copyright © 2025 Bản quyền thuộc về Sinh vật biển Việt Nam</p>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={4}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </IonPage>
    )
}

export default AuthenLayout
