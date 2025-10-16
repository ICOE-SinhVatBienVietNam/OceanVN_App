// Import libraries
import { IonPage, IonRouterOutlet } from "@ionic/react"
import React, { lazy, Suspense } from "react"

// Images
import wave from "../../assets/Wave.png"
import oceavn from "../../assets/SinhVatBienVN.png"
import { Link, Redirect, Route } from "react-router-dom"

interface WrapperProps {
  form: React.ComponentType<any>; // nhận component bất kỳ
}

// Main component
const AuthenLayout: React.FC<WrapperProps> = ({ form: Form }) => {
    return (
        <IonPage>
            <div className="relative h-full w-full flex items-end-safe">
                <img src={wave} className="w-full" />
                <div className="absolute top-0 left-0 h-full w-full flex flex-col gap-2.5 pt-7">
                    <span className="flex flex-col items-center-safe">
                        <img src={oceavn} className="w-[25%]" />
                    </span>

                    <span className="flex-1 w-full flex justify-center-safe px-5">
                        <Form />
                    </span>

                </div>
            </div>
        </IonPage>
    )
}

export default AuthenLayout
