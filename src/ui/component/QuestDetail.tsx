import React, { useRef, useState } from "react"

// Motion
import { motion } from "framer-motion"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Hooks
import { useAuthCheckPopup } from "../../hooks/AuthCheck"
import { useConfirm } from "../../hooks/ConfirmForm"

// Comment
interface Comment_interface {
    toggleCommentForm: () => void
}

const Comment: React.FC<Comment_interface> = ({ toggleCommentForm }) => {
    const confirmPopup = useConfirm()
    // State
    const [commentBody, setCommentBody] = useState<string>("")

    const toggleComment = async () => {
        if (commentBody) {
            await confirmPopup({
                message: "Câu trả lời của bạn sẽ không được lưu lại"
            }).then((choice) => {
                if (choice) toggleCommentForm()
            })

            return
        } else toggleCommentForm()
    }

    return (
        <div className="mainShadow w-full h-fit flex flex-col gap-1.5 px-3.5 py-2.5 rounded-main">
            <span className="h-fit w-full flex">
                <button
                    onClick={toggleComment}
                    className="w-full h-fit bg-mainRedRGB text-mainRed font-medium text-csBig py-2.5! rounded-small!"
                >
                    X
                </button>
            </span>

            <span className="h-fit flex items-center-safe justify-between">
                <h5 className="flex items-center-safe gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.99 7.5 8.24 3.75m0 0L4.49 7.5m3.75-3.75v16.499h11.25" />
                    </svg>

                    Trả lời
                </h5>

                <p className="text-csNormal text-gray font-medium">0/100 từ</p>
            </span>

            <textarea
                rows={8}
                onChange={(e) => { setCommentBody(e.target.value) }}
                value={commentBody}
                placeholder="Trả lời..."
                autoFocus
                className="resize-none outline-none h-full w-full bg-white text-csNormal! rounded-main border-[0.5px] border-lightGray p-2.5"
            ></textarea>

            <span className="h-fit flex items-center-safe justify-between">
                <p className="h-fit text-csSmall text-mainRed font-medium flex items-center-safe gap-1">
                    <i className="fas fa-exclamation text-mainRed"></i>

                    Câu trả lời luôn công khai
                </p>

                <button className="h-fit w-fit bg-mainLightBlue px-10! py-2! rounded-small!">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-5">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </span>
        </div>
    )
}

// Main component
interface QuestDetail_interface {
    toggleQuestDetail: () => void,
    createQuestion: () => void
}

const QuestDetail: React.FC<QuestDetail_interface> = ({ toggleQuestDetail, createQuestion }) => {
    const authCheckPopup = useAuthCheckPopup()
    const answers = [
        { user: "Nguyen Van A", date: "27/10/2025", role: "user", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { user: "Nguyen Van B", date: "27/10/2025", role: "admin", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { user: "Nguyen Van C", date: "27/10/2025", role: "user", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
        { user: "Nguyen Van D", date: "27/10/2025", role: "user", body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    ]
    // State
    const [isCommentForm, setIsCommentForm] = useState<boolean>(false)
    const [isCloseQuestDetail, setIsCloseQuestDetail] = useState<boolean>(false)
    const [isAuth, setIsAuth] = useState<boolean>(false) // True => No login

    // Toggle
    const toggleCommentForm = () => {
        if (!isAuth) {
            setIsCommentForm(!isCommentForm)
        } else {
            authCheckPopup()
        }
    }

    const handleClose = () => {
        setIsCloseQuestDetail(true)
        setTimeout(() => {
            toggleQuestDetail()
        }, 200)
    }

    const handleCreateQuestion = () => {
        handleClose()
        createQuestion()
    }


    return (
        <motion.div
            initial={{ x: !isCloseQuestDetail ? "100%" : 0 }}
            animate={{ x: !isCloseQuestDetail ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mainShadow fixed inset-0 z-50 top-0 left-0 h-full w-full bg-white flex flex-col py-2.5"
        >
            <span className="flex justify-between items-center px-mainTwoSidePadding">
                <button
                    onClick={handleClose}
                    className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button onClick={handleCreateQuestion}
                className="h-fit bg-mainLightBlue flex items-center-safe gap-1.5 text-white text-csNormal px-5! py-2.5! rounded-small!"
                >
                    <i className="fas fa-plus text-white"></i>

                    Câu hỏi mới
                </button>
            </span>

            <span className="flex-1 h-0 flex flex-col overflow-y-auto px-mainTwoSidePadding">
                <div className="flex flex-col gap-2.5 mb-5">
                    <div className="flex items-center-safe justify-between gap-2.5 py-2.5">
                        <button className="text-csSmall text-mainRed font-medium">Ngày tạo: 27/10/2025</button>
                        <button className="text-csSmall text-mainRed font-medium">Câu hỏi đã đóng: 28/10/2025</button>
                    </div>

                    <span className="mainShadow !h-[200px] flex-shrink-0 flex justify-center items-center p-2.5 rounded-main overflow-hidden">
                        <img src={Logo} className="h-full" />
                    </span>

                    <span className="flex flex-col items-center-safe py-2.5">
                        <h4 className="leading-relaxed !font-medium uppercase">Tiêu đề câu hỏi</h4>
                    </span>

                    <span className="w-full h-fit">
                        <p className="text-gray text-csMedium leading-loose text-justify px-2.5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </span>
                </div>

                <div className="w-full h-fit flex flex-col gap-2.5">
                    <span className="sticky top-0 left-0 bg-white h-fit w-full flex items-center-safe justify-between py-2.5">
                        <h4 className="flex items-center-safe gap-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>

                            Câu trả lời (4)
                        </h4>

                        {!isCommentForm && (
                            <button
                                onClick={toggleCommentForm}
                                className="h-fit w-fit text-csNormal font-medium text-mainDarkBlue bg-mainLightBlueRGB px-5! py-2.5! rounded-small!"
                            >
                                Trả lời
                            </button>
                        )}
                    </span>

                    <span className="f-fit w-full flex flex-col gap-2.5 px-0.5">
                        {answers.map((answer, index) => {
                            return (
                                <span key={index} className="h-fit flex flex-col gap-1.5 p-3.5 border-[0.5px] border-lightGray rounded-main rounded-tl-none">
                                    <span className="h-fit flex-1 flex items-center-safe gap-2.5">
                                        <p className="h-fit flex items-center-safe gap-1.5 text-csBig font-medium">{answer.user}</p>
                                        {answer.role === "admin" && (
                                            <>
                                                <i className="fas fa-circle text-csTiny text-mainDarkBlue"></i>
                                                <p className="h-fit flex-1 flex items-center-safe gap-1.5 text-csSmall text-mainDarkBlue font-medium">Admin</p>
                                            </>
                                        )}
                                    </span>

                                    <p className="h-fit text-csNormal flex items-center-safe gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>

                                        {answer.date}
                                    </p>

                                    <p className="h-fit text-gray text-csMedium leading-loose text-justify px-2.5">{answer.body}</p>
                                </span>
                            )
                        })}

                    </span>

                    {isCommentForm && (<Comment toggleCommentForm={toggleCommentForm} />)}
                </div>
            </span>
        </motion.div>
    )
}

export default QuestDetail