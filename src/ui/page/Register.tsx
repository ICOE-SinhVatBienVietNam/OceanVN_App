import React, { lazy } from "react"
import { Link } from "react-router-dom"

// Config
import { routeConfig } from "../../config/routeConfig"
import { IonRouterLink } from "@ionic/react"

// Layout
const AuthenLayout = lazy(() => import("../layout/AuthenLayout"))

const RegisterForm: React.FC = () => {
    return (
        <div className="shadowForm h-fit w-full bg-white p-5 rounded-main flex flex-col gap-4">
            <span className="flex flex-col items-center-safe">
                <h1 className="w-fit uppercase !text-csLarge font-semibold">Đăng ký</h1>
                <p className="text-csNormal text-gray font-light">Vui lòng điền đầy đủ thông tin bên dưới</p>
            </span>

            <span className="flex flex-col gap-1">
                <p className="text-csNormal font-semibold">Tên<b className="text-mainRed">*</b></p>
                <input type="text" placeholder="VD: Nguyen Van A" className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
            </span>

            <span className="flex flex-col gap-1">
                <p className="text-csNormal font-semibold">Email<b className="text-mainRed">*</b></p>
                <input type="text" placeholder="Nhập email..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
            </span>

            <span className="flex flex-col gap-1">
                <p className="text-csNormal font-semibold">Mật khẩu<b className="text-mainRed">*</b></p>
                <span className="relative w-full">
                    <input type="text" placeholder="Nhập mật khẩu..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute top-1/2 right-2.5 translate-y-[-50%]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </span>
            </span>

            <span className="flex flex-col gap-1">
                <p className="text-csNormal font-semibold">Nhập lại mật khẩu<b className="text-mainRed">*</b></p>
                <span className="relative w-full">
                    <input type="text" placeholder="Nhập mật khẩu..." className="w-full h-[40px] !text-csNormal border-[0.5px] border-lightGray px-2.5 rounded-small" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute top-1/2 right-2.5 translate-y-[-50%]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </span>
            </span>

            <span className="flex flex-col items-center-safe gap-3">
                <button className="w-full h-[40px] bg-mainLightBlue text-white !rounded-small">Đăng ký</button>
                <IonRouterLink href={routeConfig.login.root} className="!text-csNormal !text-mainDarkBlue italic underline">Đã có tài khoản?</IonRouterLink>
            </span>
        </div>
    )
}

const Register: React.FC = () => {
    return <AuthenLayout form={RegisterForm} />

}

export default Register