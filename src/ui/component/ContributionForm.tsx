import { CameraSource } from "@capacitor/camera";
import React, { lazy, useState } from "react"

// Images
import MyPostion from "../../assets/svg/MyPosition.svg"
import ChooseLocation from "../../assets/svg/ChooseLocation.svg"

// Toast
import { ToastType } from "../layout/MainLayout"

// Component
const SnapMap = lazy(() => import("./SnapMap"))

// Confirm form
interface ConfirmForm_interface {
    confirm: (type: typePosition_type) => void
}

const ConfirmForm: React.FC<ConfirmForm_interface> = ({ confirm }) => {
    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)] flex justify-center-safe items-center-safe px-mainTwoSidePadding">
            <div className="bg-white flex flex-col gap-5 px-mainTwoSidePadding rounded-main py-2.5">
                <span className="flex flex-col gap-1.5 items-center-safe">
                    <h3 className="!leading-0">Chọn vị trí</h3>
                    <p className="text-csNormal text-gray">Chọn vị trí của bức ảnh</p>
                </span>

                <span className="flex items-center-safe gap-2.5">
                    <span
                        onClick={() => { confirm("myLocation") }}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <img src={MyPostion} className="!h-2/3" />
                        <p className="text-csNormal font-medium">Vị trí của tôi</p>
                    </span>

                    <span
                        onClick={() => { confirm("map") }}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <img src={ChooseLocation} className="!h-2/3" />
                        <p className="text-csNormal font-medium">Bản đồ</p>
                    </span>
                </span>

                <span className="w-full">
                    <p className="text-csNormal text-center">Vị trí bạn cung cấp giúp <i className="text-mainDarkBlue font-medium underline">Nhóm Sinh Vật Biển Việt Nam</i> khảo sát dễ dàng hơn.</p>
                </span>

                <span className="w-full">
                    <button
                        onClick={() => { confirm("") }}
                        className="w-full bg-mainRed text-white !py-2.5 !rounded-main"
                    >
                        Quay lại
                    </button>
                </span>
            </div>
        </div>
    )
}

type typePosition_type = "" | "myLocation" | "map"
interface ContributionForm_interface {
    toggleForm: (toast?: ToastType) => void
    image: string | null;
    onRetake: (source: CameraSource) => void;
}

const ContributionForm: React.FC<ContributionForm_interface> = ({ toggleForm, image, onRetake }) => {
    // Contribute
    const [isContribute, setIsContribute] = useState<boolean>(false)
    const [isSnapMap, setIsSnapMap] = useState<boolean>(false)

    const handleContribute = () => {
        setIsContribute(false)
        setIsSnapMap(false)
        toggleForm({
            toastMessage: "Đã đóng góp",
            toastType: "success"
        })
    }

    // ConfirmForm
    const [isConfirmForm, setIsConfirmForm] = useState<boolean>(false)
    const [typePosition, setTypePosition] = useState<typePosition_type>("")

    const handleConfirmForm = (type?: typePosition_type) => {
        if (isContribute) {
            if (type === "map") {
                setIsSnapMap(!isSnapMap)
            }

            if (type === "myLocation") {
                toggleForm({
                    toastMessage: "Đã đóng góp",
                    toastType: "success"
                })
            }
            
            setIsConfirmForm(!isConfirmForm)
        } else toggleForm({
            toastMessage: "Đã lưu ảnh",
            toastType: "success"
        })
    }

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 pt-2.5">
            <span className="w-full px-mainTwoSidePadding flex justify-end-safe">
                <button className="bg-mainRedRGB !px-10 !py-2 !rounded-main" onClick={() => { toggleForm() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-mainRed">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </span>

            <span className="flex-1 h-0 px-mainTwoSidePadding overflow-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                    <span className="">
                        <h2 className="!leading-0 py-2.5">Thông tin bức ảnh</h2>
                    </span>

                    <span className="w-full flex flex-col gap-5">
                        <span className="w-full flex flex-col gap-2.5">
                            {image ? (
                                <img src={image} alt="Selected" className="h-[200px] w-full object-cover bg-lightGray rounded-small" />
                            ) : (
                                <span className="h-[200px] bg-lightGray rounded-small"></span>
                            )}

                            <span className="w-full flex items-center-safe gap-2.5">
                                <button type="button" onClick={() => onRetake(CameraSource.Camera)} className="mainShadow w-2/5 h-[40px] bg-white text-csNormal font-medium flex items-center-safe justify-center-safe gap-2.5 !border-[0.5px] !border-lightGray !rounded-small">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>

                                    Chụp lại
                                </button>

                                <button type="button" onClick={() => onRetake(CameraSource.Photos)} className="flex-1 h-[40px] text-white bg-mainDark text-csNormal flex items-center-safe justify-center-safe gap-2.5 !rounded-small">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>

                                    Tải ảnh lên
                                </button>
                            </span>
                        </span>

                        <span className="w-full flex flex-col gap-2.5">
                            <span className="w-full">
                                <span className="w-full flex items-center justify-between">
                                    <p className="text-csMedium font-medium">Tên bức ảnh</p>
                                    <p className="text-csSmall text-gray">0/50 ký tự</p>
                                </span>

                                <input type="text" className="outline-none w-full !text-csNormal border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" />
                            </span>

                            <span className="w-full">
                                <span className="w-full flex items-center justify-between">
                                    <p className="text-csMedium font-medium">Mô tả bức ảnh</p>
                                    <p className="text-csSmall text-gray">0/50 từ</p>
                                </span>

                                <textarea className="outline-none resize-none w-full !h-[200px] !text-csNormal border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small">

                                </textarea>
                            </span>

                            <span className="flex items-center-safe gap-2">
                                <input type="checkbox" onChange={() => { setIsContribute(!isContribute) }} />
                                <p className="text-csNormal">Đóng góp hình ảnh</p>
                            </span>
                        </span>
                    </span>
                </form>
            </span>

            <span className="px-mainTwoSidePadding flex gap-2.5 items-center-safe pb-2.5">
                <button className="w-1/3 h-[40px] bg-white text-csNormal !border-[0.5px] !border-lightGray !rounded-small">Làm mới</button>

                <button
                    onClick={() => { handleConfirmForm() }}
                    className="flex-1 h-[40px] text-white bg-mainLightBlue text-csNormal flex items-center-safe justify-center-safe gap-2.5 !rounded-small"
                >
                    <i className="far fa-save text-white"></i>
                    {isContribute ? "Đóng góp" : "Lưu ảnh"}
                </button>
            </span>

            {isConfirmForm && (<ConfirmForm confirm={handleConfirmForm} />)}
            {isSnapMap && (<SnapMap getPosition={handleContribute} />)}
        </div>
    )
}

export default ContributionForm