import React, { lazy, useState } from "react"
import { IonRouterLink } from "@ionic/react"
import { routeConfig } from "../../config/routeConfig"

// Layout
const AuthenLayout = lazy(() => import("../layout/AuthenLayout"))

// Popup Component
const ResetInfoPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-main shadow-lg text-center flex flex-col gap-4 items-center w-[90%] max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-mainGreen">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h2 className="text-csLarge font-semibold">Yêu cầu đã được gửi</h2>
                <p className="text-csNormal text-gray">Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.</p>
                <button onClick={onClose} className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small mt-4">
                    Đã hiểu
                </button>
            </div>
        </div>
    )
}


const RequireResetForm: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically handle the API call to send the reset email
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        // Optionally, redirect the user after closing the popup, e.g., back to login
    }

    return (
        <>
            {showPopup && <ResetInfoPopup onClose={handleClosePopup} />}
            <form onSubmit={handleSubmit} className="shadowForm h-fit w-full bg-white p-5 rounded-main flex flex-col gap-4">
                <span className="flex flex-col items-center-safe text-center gap-2">
                    {/* Lock Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    <h1 className="w-fit uppercase !text-csLarge font-semibold">Quên mật khẩu</h1>
                    <p className="text-csNormal text-gray font-light">
                        Vui lòng nhập địa chỉ email của bạn.
                    </p>
                </span>

                <span className="flex flex-col gap-1">
                    <p className="text-csNormal font-semibold">Email<b className="text-mainRed">*</b></p>
                    <input required type="email" placeholder="Nhập email..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
                </span>

                <span className="flex flex-col items-center-safe gap-3 mt-4">
                    <button type="submit" className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small">Gửi yêu cầu</button>
                    <IonRouterLink routerLink={routeConfig.login.root} className="!text-csNormal !text-mainDarkBlue italic underline">Quay lại đăng nhập</IonRouterLink>
                </span>
            </form>
        </>
    )
}

const RequireReset: React.FC = () => {
    return <AuthenLayout form={RequireResetForm} />
}

export default RequireReset