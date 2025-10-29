// Import libraries
import React, { lazy, useState } from "react"

// Motion
import { motion } from "framer-motion"

// Images
import MyPostion from "../../assets/svg/MyPosition.svg"
import ChooseLocation from "../../assets/svg/ChooseLocation.svg"

// Toast
import { ToastType } from "../layout/MainLayout"

type typePosition_type = "" | "myLocation" | "map"
interface ContributionForm_interface {
    toggleForm: (toast?: ToastType) => void
}

const QuestionForm: React.FC<ContributionForm_interface> = ({ toggleForm }) => {
    // Contribute
    const [isPublic, setIsPublic] = useState<boolean>(false)

    const [isCloseForm, setIsCloseForm] = useState<boolean>(false)
    const handleToggleForm = () => {
        setIsCloseForm(true)
        setTimeout(() => {
            toggleForm()
        }, 200)
    }

    return (
        <motion.div
            initial={{ x: !isCloseForm ? "100%" : 0 }}
            animate={{ x: !isCloseForm ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 pt-2.5"
        >
            <span className="flex-1 h-0 px-mainTwoSidePadding overflow-auto">
                <form>
                    <span className="h-fit w-full flex flex-col">
                        <h2 className="leading-none!">
                            <i className="fas fa-question"></i>
                            Câu hỏi
                        </h2>
                        <p className="text-gray text-csNormal">Vui lòng điền đầy đủ thông tin</p>
                    </span>

                    <span className="w-full flex flex-col gap-5 mt-2.5">
                        <span className="w-full flex flex-col gap-2.5">
                            <span className="h-[200px] bg-lightGray rounded-small"></span>

                            <span className="w-full flex items-center-safe gap-2.5">
                                <button className="flex-1 h-[40px] text-white bg-mainDark text-csNormal flex items-center-safe justify-center-safe gap-2.5 !rounded-small">
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
                                    <p className="text-csMedium font-medium">Chủ đề <b className="text-mainRed">*</b></p>
                                    <p className="text-csSmall text-gray">0/50 ký tự</p>
                                </span>

                                <input type="text" className="outline-none w-full !text-csNormal border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" />
                            </span>

                            <span className="w-full">
                                <span className="w-full flex items-center justify-between">
                                    <p className="text-csMedium font-medium">Nội dung câu hỏi</p>
                                    <p className="text-csSmall text-gray">0/300 từ</p>
                                </span>

                                <textarea
                                    className="outline-none resize-none w-full !h-[200px] !text-csNormal border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small"
                                >
                                </textarea>
                            </span>

                            <span className="flex items-center-safe gap-2">
                                <input type="checkbox" onChange={() => { setIsPublic(!isPublic) }} />
                                <p className="text-csNormal">Chia sẻ lên cộng đồng</p>
                            </span>
                        </span>
                    </span>
                </form>
            </span>

            <span className="px-mainTwoSidePadding flex gap-2.5 items-center-safe pb-2.5">
                <button
                onClick={handleToggleForm}
                    className="w-1/3 h-[40px] bg-mainRedRGB text-mainRed font-medium text-csNormal !rounded-small"
                >
                    Xóa
                </button>

                <button
                onClick={handleToggleForm}
                    className="flex-1 h-[40px] text-white bg-mainLightBlue text-csNormal flex items-center-safe justify-center-safe gap-2.5 !rounded-small"
                >
                    Gửi
                </button>
            </span>
        </motion.div>
    )
}

export default QuestionForm