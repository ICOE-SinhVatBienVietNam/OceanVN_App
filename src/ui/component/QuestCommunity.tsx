import React, { useEffect, useState } from "react"

// Motion
import { motion } from "framer-motion"

// Images
import Logo from "../../assets/SinhVatBienVN.png"
import { useDispatch, useSelector } from "react-redux"
import { questionPagination, resetPublicQuestions, setQuestionDetailId } from "../../redux/state/questionReducer"
import { QuestionService } from "../../services/questionService"
import { RootState } from "../../redux/store"
import { useDebounce } from "../../hooks/Debounce"
import { cloudinaryThumbnail } from "../../config/gateway"

// Component
const QuestionCard: React.FC<{
    id: string,
    questionData: questionPagination,
    openDetail: () => void
}> = ({ id, openDetail, questionData }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        openDetail()
        dispatch(setQuestionDetailId(id))
    }

    return (
        <span className="relative mainShadow h-fit min-w-[30%] flex gap-2.5 rounded-small px-2.5" onClick={handleClick}>
            <span className="h-full w-[60px] shrink-0 flex justify-center-safe items-center-safe">
                <img src={questionData.thumbnail ? cloudinaryThumbnail + questionData.thumbnail : Logo} className="w-full" />
            </span>

            <span className="flex-1 h-full flex flex-col gap-1.5 py-3.5">
                <span className="flex-1 min-w-0 flex flex-col justify-between">
                    <h6 className="!leading-none my-0!">{questionData.title}</h6>
                    <p className="!line-clamp-2 text-csSmall text-gray">{questionData.body}</p>
                </span>

                <span className="h-fit flex-1 flex items-center-safe gap-2.5">
                    <p className="h-fit flex items-center-safe gap-1.5 text-csSmall">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>

                        {new Date(questionData.created_at).toLocaleString("vi-VN").split(" ")[1]}
                    </p>

                    <span className="w-fit h-fit flex items-center gap-1.5">
                        <i className="fas fa-user text-csTiny"></i>
                        <p className="h-fit flex-1 flex items-center-safe gap-1.5 text-csSmall text-mainRed font-medium">{questionData.createByUser.name}</p>
                    </span>
                </span>

            </span>
        </span>
    )
}

interface QuestCommunity_interface {
    toggleQuestCommunity: () => void,
    openDetail: () => void
}

const QuestCommunity: React.FC<QuestCommunity_interface> = ({ toggleQuestCommunity, openDetail }) => {
    const [isCloseQuestCommunity, setIsCloseQuestCommunity] = useState<boolean>(false)
    const closeQuestCommunity = () => {
        setIsCloseQuestCommunity(true)
        setTimeout(() => {
            toggleQuestCommunity()
        }, 200)
    }

    const [search, setSearch] = useState<string>("")
    const debounceSearch = useDebounce(search, 1000)

    // State
    const user = useSelector((state: RootState) => state.auth.user)
    const paginationInfo = useSelector((state: RootState) => state.question.publicPagination)
    const paginationData = useSelector((state: RootState) => state.question.publicData)
    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController();
        dispatch(resetPublicQuestions());
        if (user) {
            (async () => {
                await QuestionService.questionPagination(1, 15, undefined, debounceSearch, "DESC", true, controller.signal);
            })();
        }
        return () => {
            controller.abort();
        }
    }, [user, dispatch, debounceSearch]);

    useEffect(() => {
        if (!user || paginationInfo.page === 1) return;
        const controller = new AbortController();
        (async () => {
            await QuestionService.questionPagination(paginationInfo.page, 15, undefined, debounceSearch, "DESC", true, controller.signal);

        })();
        return () => {
            controller.abort();
        }
    }, [user, paginationInfo, dispatch, debounceSearch]);

    return (
        <motion.div
            initial={{ x: !isCloseQuestCommunity ? "100%" : 0 }}
            animate={{ x: !isCloseQuestCommunity ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 px-mainTwoSidePadding overflow-auto pt-2.5"
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

                            <span className="">
                                <h2 className="leading-none!">Cộng đồng</h2>
                                <p className="text-csNormal text-mainRed font-medium">Số lượng: {paginationInfo.total} câu hỏi</p>
                            </span>
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
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </span>
                    </span>
                </span>

                <span className="w-full flex-1 h-0 overflow-auto flex flex-col gap-2.5 px-0.5 py-2.5">
                    {paginationData.map((question) => {
                        return <QuestionCard key={question.id} questionData={question} id={question.id} openDetail={openDetail} />

                    })}
                </span>
            </div>
        </motion.div>
    )
}

export default QuestCommunity