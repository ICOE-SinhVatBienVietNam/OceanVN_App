import React, { useState } from "react"

// Motion
import { motion } from "framer-motion"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Component
const QuestionCard: React.FC<{
    id: number,
}> = ({ id }) => {
    const handleClick = () => {
        console.log("Chưa có gì hẹ hẹ :v")
    }

    return (
        <span className="relative mainShadow h-[120px] min-w-[30%] flex-1 flex gap-2.5 rounded-small px-2.5" onClick={handleClick}>
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

                <span className="h-fit flex-1 flex items-center-safe gap-2.5">
                    <p className="h-fit flex items-center-safe gap-1.5 text-csSmall">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>

                        27/10/2025
                    </p>

                    <span className="w-fit h-fit flex items-center gap-1.5">
                        <i className="fas fa-user text-csTiny"></i>
                        <p className="h-fit flex-1 flex items-center-safe gap-1.5 text-csSmall text-mainRed font-medium">Nguyen Van A</p>
                    </span>
                </span>

            </span>
        </span>
    )
}

interface QuestCommunity_interface {
    toggleQuestCommunity: () => void
}

const QuestCommunity: React.FC<QuestCommunity_interface> = ({ toggleQuestCommunity }) => {
    const [isCloseQuestCommunity, setIsCloseQuestCommunity] = useState<boolean>(false)
    const closeQuestCommunity = () => {
        setIsCloseQuestCommunity(true)
        setTimeout(() => {
            toggleQuestCommunity()
        }, 200)
    }

    return (
        <motion.div
            initial={{ x: !isCloseQuestCommunity ? "100%" : 0 }}
            animate={{ x: !isCloseQuestCommunity ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 px-mainTwoSidePadding overflow-auto pt-2.5"
        >
            <div className="w-full h-full flex flex-col">
                <span className="sticky top-0 left-0 flex flex-col gap-2.5 bg-white pb-2.5">
                    <span className="w-full flex flex-col items-start">
                        <span className="flex-1 flex items-center-safe gap-2.5">
                            <button
                                onClick={closeQuestCommunity}
                                className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <h2 className="leading-none! mb-1.5">Cộng đồng</h2>
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
                    </span>
                </span>

                <span className="w-full flex-1 h-0 overflow-auto flex flex-col justify-between gap-2.5 px-0.5 py-2.5">
                    {Array(20).fill(0).map((_, index) => {
                        return <QuestionCard key={index} id={index} />
                    })}
                </span>
            </div>
        </motion.div>
    )
}

export default QuestCommunity