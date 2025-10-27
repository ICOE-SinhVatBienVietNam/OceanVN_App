// Import libraries
import React, { useRef, useState } from "react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"
import Facebook_logo from "../../assets/Facebook.png"
import Zalo_logo from "../../assets/zalo.png"
import Gmail_logo from "../../assets/Gmail.png"

// Config
import { toastConfig } from "../../config/toastConfig"

// Component
import QuestCommunity from "../component/QuestCommunity"
import QuestDetail from "../component/QuestDetail"
import QuestionForm from "../component/QuestionForm"

const QuestionCard: React.FC<{
    id: number,
    isDeleting: boolean,
    isSelected: boolean,
    onSelect: (id: number) => void,
    toggleQuestDetailForm: () => void
}> = ({ id, isDeleting, isSelected, onSelect, toggleQuestDetailForm }) => {
    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            toggleQuestDetailForm()
        }
    }

    return (
        <span className="relative mainShadow h-[120px] min-w-[30%] flex-1 flex gap-2.5 rounded-small px-2.5" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="h-full w-[70px] shrink-0 flex justify-center-safe items-center-safe">
                <img src={Logo} className="w-full" />
            </span>

            <span className="flex-1 h-full flex flex-col gap-1.5 py-3.5">
                <span className="flex-1 min-w-0 flex flex-col justify-between">
                    <h5 className="!leading-none my-0!">Tiêu đề câu hỏi</h5>
                    <p className="!line-clamp-2 text-csNormal text-gray">
                        Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v Nội dung câu hỏi hẹ hẹ :v ...
                    </p>
                </span>

                <p className="h-fit flex-1 flex items-center-safe gap-1.5 text-csSmall">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    27/10/2025
                </p>
            </span>
        </span>
    )
}


type differentConnections = {
    label: string,
    thumbnail: string
}

const Quest: React.FC = () => {
    // State
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    // Different connection
    const differentConnections = useRef<differentConnections[]>([
        { label: "Gmail", thumbnail: Gmail_logo },
        { label: "Facebook", thumbnail: Facebook_logo },
        { label: "Zalo", thumbnail: Zalo_logo },
    ])

    // Toggle
    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting)
        setSelectedItems([])
    }

    const [isCommunity, setIsCommunity] = useState<boolean>(false)
    const toggleQuestCommunity = () => {
        setIsCommunity(!isCommunity)
    }

    const [isQuestDetail, setIsQuestDetail] = useState<boolean>(false)
    const toggleQuestDetail = () => {
        setIsQuestDetail(!isQuestDetail)
    }

    const [isQuestionForm, setIsQuestionForm] = useState<boolean>(false)
    const toggleQuestionForm = () => {
        setIsQuestionForm(!isQuestionForm)
    }

    // Handler
    const handleSelectItem = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        )
    }

    const handleDelete = () => {
        console.log("Xóa các mục:", selectedItems)

        toastConfig({
            toastType: "success",
            toastMessage: `Đã xóa ${selectedItems.length} mục thành công`
        })

        toggleIsDeleting()
    }

    return (
        <div className="relative h-full w-full flex flex-col gap-2.5 px-mainTwoSidePadding overflow-auto">
            <>
                <div className="w-full flex-col">
                    <span className="flex items-center justify-between">
                        <h2 className="">Các kênh liên hệ khác</h2>
                    </span>

                    <span className="w-full flex justify-start gap-5 overflow-x-auto p-0.5">
                        {differentConnections.current.map((connection, index) => {
                            return (
                                <span key={index} className="h-fit w-[60px] flex flex-col items-center-safe gap-1.5">
                                    <span className="mainShadow w-full aspect-square bg-white flex justify-center-safe items-center-safe p-3.5 rounded-full">
                                        <img className="w-full" src={connection.thumbnail} />
                                    </span>

                                    <p className="text-csNormal text-nowrap font-medium">{connection.label}</p>
                                </span>
                            )
                        })}
                    </span>
                </div>

                <div className="w-full h-full flex flex-col">
                    <span className="sticky top-0 left-0 flex flex-col gap-2.5 bg-white pb-2.5">
                        <span className="w-full flex justify-between items-center-safe">
                            <span className="">
                                <h2 className="leading-none! mb-1.5">Câu hỏi của tôi</h2>
                                <p className="text-csNormal text-mainRed font-medium">Số lượng: 20 câu hỏi</p>
                            </span>

                            <span className="h-fit w-fit">
                                <button
                                onClick={toggleQuestCommunity}
                                    className="bg-mainLightBlueRGB text-csNormal text-mainLightBlue font-medium px-2.5! py-2.5! rounded-small!"
                                >
                                    Cộng đồng
                                </button>
                            </span>
                        </span>

                        <span className="w-full flex items-center-safe gap-2.5">
                            <span className="mainShadow h-[40px] flex-1 flex items-center-safe gap-2.5 px-2.5 rounded-small">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                <input
                                    className="!text-csNormal h-full w-full outline-none"
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                />
                            </span>

                            {!isDeleting && (
                                <button className="mainShadow w-[40px] h-[40px] flex justify-center-safe items-center-safe rounded-small!" onClick={toggleIsDeleting}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.077-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            )}
                        </span>
                    </span>

                    <span className="w-full flex-1 h-0 overflow-auto flex flex-col justify-between gap-2.5 px-0.5 py-2.5">
                        {Array(20).fill(0).map((_, index) => {
                            return <QuestionCard key={index} id={index} isDeleting={isDeleting} isSelected={selectedItems.includes(index)} onSelect={handleSelectItem} toggleQuestDetailForm={toggleQuestDetail} />
                        })}
                    </span>

                    {!isDeleting && (
                        <span className="absolute bottom-5 right-mainTwoSidePadding">
                            <button className="mainShadow h-[50px] aspect-square bg-mainLightBlue flex justify-center-safe items-center-safe rounded-full" onClick={toggleQuestionForm}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 stroke-white fill-white">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    )}

                    {isDeleting && (
                        <div className="absolute left-0 bottom-0 w-full px-mainTwoSidePadding py-2.5 bg-white drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
                            <div className="w-full flex justify-center-safe items-center-safe gap-5">
                                <button
                                    onClick={toggleIsDeleting}
                                    className="mainShadow w-full h-fit py-2.5! bg-lightGray rounded-main text-csNormal font-semibold"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={selectedItems.length === 0}
                                    className="mainShadow w-full h-fit py-2.5! bg-mainRed rounded-main text-csNormal font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {`Xóa(${selectedItems.length})`}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>

            {isCommunity && (<QuestCommunity toggleQuestCommunity={toggleQuestCommunity} openDetail={toggleQuestDetail} />)}
            {isQuestDetail && (<QuestDetail toggleQuestDetail={toggleQuestDetail} />)}
            {isQuestionForm && (<QuestionForm toggleForm={toggleQuestionForm} />)}
        </div>
    )
}

export default Quest