// Import libraries
import { IonPage, IonRouterOutlet } from "@ionic/react"
import React, { lazy, Suspense } from "react"

// Images
import wave from "../../assets/Wave.png"
import oceavn from "../../assets/SinhVatBienVN.png"
import { Link, Redirect, Route } from "react-router-dom"

// Main component
const AuthenLayout: React.FC = () => {
    return (
        <IonPage>
            <div className="relative h-full w-full flex items-end-safe">
                <img src={wave} className="w-full" />
                <div className="absolute top-0 left-0 h-full w-full flex flex-col">
                    <span className="flex flex-col items-center-safe">
                        <img src={oceavn} className="w-1/3" />
                        <span className="w-full flex flex-col items-center-safe">
                            <h1 className="w-fit uppercase !text-csLarge !text-mainLightBlue font-semibold">sinh vật biển việt nam</h1>
                            <p className="text-csNormal text-gray font-medium">
                                Nơi chia sẻ các kiến thức về sinh vật biển ở Việt Nam
                            </p>
                        </span>
                    </span>

                    <span className="flex-1 w-full flex justify-center-safe px-5">
                        <div className="shadowForm h-fit w-full bg-white p-5 rounded-main">
                            <span className="flex flex-col items-center-safe">
                                <h1 className="w-fit uppercase !text-csLarge font-semibold">Đăng nhập</h1>
                                <p className="text-csNormal text-gray font-medium">Vui lòng điền đầy đủ thông tin bên dưới</p>
                            </span>

                            <span className="">
                                <p className="text-csNormal font-semibold">Email<b className="text-mainRed">*</b></p>
                                <input type="text" placeholder="Nhập email..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
                            </span>

                            <span className="">
                                <p className="text-csNormal font-semibold">Mật khẩu<b className="text-mainRed">*</b></p>
                                <span className="relative w-full">
                                    <input type="text" placeholder="Nhập mật khẩu..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute top-1/2 right-2.5 translate-y-[-50%]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </span>
                            </span>

                            <span className="w-full flex justify-end-safe">
                                <Link to="" className="!text-csNormal !text-mainLightBlue italic underline">Quên mật khẩu</Link>
                            </span>

                            <span className="flex flex-col items-center-safe gap-2.5">
                                <button className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small">Đăng nhập</button>
                                <Link to="" className="!text-csNormal !text-mainDarkBlue italic underline">Chưa có tài khoản?</Link>
                            </span>
                        </div>
                    </span>

                </div>
            </div>
        </IonPage>
    )
}

export default AuthenLayout
