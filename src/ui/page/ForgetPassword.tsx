import React, { lazy, useState } from "react"

// Config
import { routeConfig } from "../../config/routeConfig"
import { IonRouterLink, useIonRouter } from "@ionic/react"
import api from "../../config/gateway"
import { AuthService } from "../../services/authService"

const ResetInfoPopup: React.FC = () => {
    const router = useIonRouter()

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-main shadow-lg text-center flex flex-col items-center w-[90%] max-w-md">
                <h1 className="leading-none! text-csLarge font-semibold">Thành công</h1>
                <p className="text-csNormal text-gray">Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.</p>

                <button onClick={() => { router.push(routeConfig.login.root, "root") }} className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small mt-7">
                    Quay lại trang đăng nhập
                </button>
            </div>
        </div>
    )
}

// Layout
const AuthenLayout = lazy(() => import("../layout/AuthenLayout"))

const ForgetPasswordForm: React.FC = () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState<boolean>(false)

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    const handleReset = async () => {
        const resetPassword = await AuthService.resetPassword(refreshToken, accessToken, confirmPassword, newPassword)

        if (resetPassword) {
            setShowPopup(true)
        }
    }

    return (
        <>
            {showPopup && <ResetInfoPopup />}
            <div className="shadowForm h-fit w-full bg-white p-5 rounded-main flex flex-col gap-4">
                <span className="flex flex-col items-center-safe">
                    <h1 className="w-fit uppercase !text-csLarge font-semibold">Tạo mật khẩu mới</h1>
                    <p className="text-csNormal text-gray font-light">Vui lòng điền đầy đủ thông tin bên dưới</p>
                </span>

                <span className="flex flex-col gap-1">
                    <p className="text-csNormal font-semibold">Mật khẩu mới<b className="text-mainRed">*</b></p>
                    <span className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu mới..."
                            className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute top-1/2 right-2.5 translate-y-[-50%]"
                            onClick={() => { setShowPassword(!showPassword) }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </span>
                </span>

                <span className="flex flex-col gap-1">
                    <p className="text-csNormal font-semibold">Nhập lại mật khẩu<b className="text-mainRed">*</b></p>
                    <span className="relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu..."
                            className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute top-1/2 right-2.5 translate-y-[-50%]"
                            onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </span>
                </span>

                <span className="flex flex-col items-center-safe gap-3 mt-4">
                    <button className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small" onClick={handleReset}>
                        Xác nhận
                    </button>
                    <IonRouterLink routerLink={routeConfig.login.root} className="!text-csNormal !text-mainDarkBlue italic underline">Quay lại đăng nhập</IonRouterLink>
                </span>
            </div>
        </>
    )
}

const ForgetPassword: React.FC = () => {
    return <AuthenLayout form={ForgetPasswordForm} />
}

export default ForgetPassword