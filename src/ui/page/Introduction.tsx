// Import libraries
import { IonPage, IonRouterLink, useIonRouter } from "@ionic/react"
import React from "react"

// Images
import wave from "../../assets/Wave.png"
import oceanvn_logo from "../../assets/SinhVatBienVN.png"

// Config
import { routeConfig } from "../../config/routeConfig"

// Main component
const Introduction: React.FC = () => {
    const router = useIonRouter()
    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col justify-end-safe">
                <div className="w-full flex flex-col items-center-safe gap-7.5 pb-7 pt-7">
                    <span className="flex flex-col justify-center-safe items-center-safe">
                        <img src={oceanvn_logo} className="w-[60%]" />
                        <h1 className="!text-csLarge text-mainLightBlue font-semibold">SINH VẬT BIỂN VIỆT NAM</h1>
                        <p className="text-csNormal text-gray font-medium">
                            Nơi chia sẻ các kiến thức về sinh vật biển ở Việt Nam
                        </p>
                    </span>

                    <span className="w-full flex flex-col items-center-safe gap-2.5">
                        <button
                            onClick={() => { router.push(routeConfig.main.map, "root") }}
                            className="flex w-[80%] text-csMedium !text-white !bg-mainLightBlue justify-center-safe items-center-safe rounded-main! py-3.5!"
                        >
                            Bắt đầu hành trình khám phá
                        </button>

                        <a
                            href="https://sinhvatbienvietnam.zoo.id.vn/trang-ch%E1%BB%A7"
                            target="_blank"
                            className="!text-mainDarkBlue text-csSmall font-semibold underline italic"
                        >
                            Tìm hiểu Nhóm Sinh Vật Biển Việt Nam
                        </a>
                    </span>
                </div>

                <img src={wave} />

                <div className="absolute h-fit w-full flex justify-center-safe bottom-5 left-1/2 translate-x-[-50%]">
                    <p className="text-white text-csSmall">Copyright © 2025 Bản quyền thuộc về Sinh vật biển Việt Nam</p>
                </div>
            </div>
        </IonPage>
    )
}

export default Introduction