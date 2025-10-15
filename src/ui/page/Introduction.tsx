// Import libraries
import { IonNavLink, IonPage } from "@ionic/react"
import React from "react"

// Images
import wave from "../../assets/Wave.png"
import oceanvn_logo from "../../assets/SinhVatBienVN.png"
import { Link } from "react-router-dom"

// Main component
const Introduction: React.FC = () => {
    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col justify-end-safe">
                <div className="w-full flex flex-col items-center-safe gap-7.5 pb-7">
                    <span className="flex flex-col justify-center-safe items-center-safe">
                        <img src={oceanvn_logo} className="w-[60%]" />
                        <h1 className="!text-csLarge text-mainLightBlue font-semibold">SINH VẬT BIỂN VIỆT NAM</h1>
                        <p className="text-csNormal text-gray font-medium">
                            Nơi chia sẻ các kiến thức về sinh vật biển ở Việt Nam
                        </p>
                    </span>

                    <span className="w-full flex flex-col items-center-safe gap-2.5">
                        <Link to="/home" className="flex w-[80%] h-[40px] text-csNormal !text-white !bg-mainLightBlue justify-center-safe items-center-safe rounded-main">
                            Bắt đầu hành trình khám phá
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>

                        <a
                            href="https://sinhvatbienvietnam.zoo.id.vn/gi%E1%BB%9Bi-thi%E1%BB%87u/v%E1%BB%81-ch%C3%BAng-t%C3%B4i"
                            target="_blank"
                            className="!text-mainDarkBlue text-csNormal font-semibold underline italic"
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