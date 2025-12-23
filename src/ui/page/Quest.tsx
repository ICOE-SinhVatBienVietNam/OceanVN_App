// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Images
import Facebook_logo from "../../assets/Facebook.png"
import Logo from "../../assets/SinhVatBienVN.png"

// Config
import { toastConfig } from "../../config/toastConfig"

// Component
import QuestCommunity from "../component/QuestCommunity"
import QuestDetail from "../component/QuestDetail"
import QuestionForm from "../component/QuestionForm"
import { IonPage, IonRouterLink, useIonRouter } from "@ionic/react"
import { routeConfig } from "../../config/routeConfig"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { questionPagination, resetPersonalQuestions, setQuestionDetailId } from "../../redux/state/questionReducer"
import { QuestionService } from "../../services/questionService"
import { useDebounce } from "../../hooks/Debounce"
import { cloudinaryThumbnail } from "../../config/gateway"
import { toast } from "react-toastify"
import { useConfirm } from "../../hooks/ConfirmForm"

const QuestionCard: React.FC<{
    data: questionPagination,
    id: string,
    isDeleting: boolean,
    isSelected: boolean,
    onSelect: (id: string) => void,
    toggleQuestDetailForm: () => void
}> = ({ data, id, isDeleting, isSelected, onSelect, toggleQuestDetailForm }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            toggleQuestDetailForm()
            dispatch(setQuestionDetailId(id))
        }
    }

    return (
        <span className="relative mainShadow h-[fit] min-w-[30%] flex gap-2.5 rounded-small px-2.5" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="h-full w-[60px] shrink-0 flex justify-center-safe items-center-safe">
                <img src={data.thumbnail ? cloudinaryThumbnail + data.thumbnail : Logo} className="w-full" />
            </span>

            <span className="flex-1 h-full flex flex-col gap-1.5 py-3.5">
                <span className="flex-1 min-w-0 flex flex-col justify-between">
                    <h6 className="!leading-none my-0!">{data.title}</h6>
                    <p className="!line-clamp-2 text-csSmall text-gray">{data.body}</p>
                </span>

                <p className="h-fit flex-1 flex items-center-safe gap-1.5 text-csTiny">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    {new Date(data.created_at).toLocaleString("vi-VN").split(" ")[1]}
                </p>
            </span>
        </span>
    )
}

const QuestUnAuth: React.FC = () => {
    const router = useIonRouter()

    return (
        <div className="fixed top-0 left-0 z-50 h-full w-full bg-[rgba(255,255,255,0.5)] backdrop-blur-md flex items-center-safe px-mainTwoSidePadding">
            <span className="mainShadow w-full bg-white flex flex-col items-center-safe py-5 px-3.5">
                <h1 className="w-fit leading-none!">Xin chào</h1>
                <p className="text-csMedium font-medium text-gray">Tính năng này yêu cầu đăng nhập</p>
                <button
                    className="w-full bg-mainLightBlue text-csMedium text-white font-medium rounded-small! py-3.5! mt-5"
                    onClick={() => { router.push(routeConfig.login.root, "root") }}
                >
                    Đăng nhập
                </button>
            </span>
        </div>
    )
}


type differentConnections = {
    label: string,
    thumbnail: string,
    path: string
}

const Quest: React.FC = () => {
    // State
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    const [search, setSearch] = useState<string>("")
    const debounceSearch = useDebounce(search, 1000)

    const paginationData = useSelector((state: RootState) => state.question.personalData) // Personal
    const paginationInfo = useSelector((state: RootState) => state.question.personalPagination)

    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()
    const confirm = useConfirm()

    // Different connection
    const differentConnections = useRef<differentConnections[]>([
        { label: "Facebook", thumbnail: Facebook_logo, path: "https://www.facebook.com/MarineBiologyOfVietnam" },
    ])

    // Load data
    useEffect(() => {
        const controller = new AbortController();
        dispatch(resetPersonalQuestions());
        if (user) {
            (async () => {
                await QuestionService.questionPagination(1, 10, user.id, debounceSearch, "DESC", undefined, controller.signal);
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
            await QuestionService.questionPagination(paginationInfo.page, 10, user.id, debounceSearch, "DESC", undefined, controller.signal);

        })();
        return () => {
            controller.abort();
        }
    }, [user, paginationInfo, dispatch, debounceSearch]);

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
    const handleSelectItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        )
    }

    const handleDelete = async () => {
        if (selectedItems.length === 0 || !user) return

        const confirmDeleteQuestion = await confirm({ title: `Xóa ${selectedItems.length} mục`, message: "Hành động không thể hoàn tác" })

        if (!confirmDeleteQuestion) return

        let pending = toastConfig({
            pending: true,
            toastMessage: "Đang xóa các mục"
        })

        await QuestionService.deleteQuestion(user?.id, selectedItems)

        toast.dismiss(pending)

        toggleIsDeleting()
    }

    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col gap-2.5 px-mainTwoSidePadding overflow-auto pt-2.5">
                {!isAuth && <QuestUnAuth />}
                <>
                    <div className="w-full flex-col">
                        <span className="flex items-center justify-between">
                            <h2 className="">Các kênh liên hệ khác</h2>
                        </span>

                        <span className="w-full flex justify-start gap-5 overflow-x-auto p-0.5">
                            {differentConnections.current.map((connection, index) => {
                                return (
                                    <IonRouterLink href={connection.path} key={index} className="h-fit w-[60px] flex flex-col items-center-safe gap-1.5">
                                        <span className="mainShadow w-full aspect-square bg-white flex justify-center-safe items-center-safe p-3.5 rounded-full">
                                            <img className="w-full" src={connection.thumbnail} />
                                        </span>

                                        <p className="text-csNormal text-nowrap font-medium">{connection.label}</p>
                                    </IonRouterLink>
                                )
                            })}
                        </span>
                    </div>

                    <div className="w-full h-full flex flex-col">
                        <span className="sticky top-0 left-0 flex flex-col gap-2.5 bg-white pb-2.5">
                            <span className="w-full flex justify-between items-center-safe">
                                <span className="">
                                    <h2 className="leading-none! mb-1.5">Câu hỏi của tôi</h2>
                                    <p className="text-csNormal text-mainRed font-medium">Số lượng: {paginationInfo.total} câu hỏi</p>
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
                                        onChange={(e) => { setSearch(e.target.value) }}
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

                        <span className="w-full flex-1 h-0 overflow-auto flex flex-col  gap-2.5 px-0.5 py-2.5">
                            {paginationData.length > 0 && paginationData.map((data) => {
                                return <QuestionCard key={data.id} data={data} id={data.id} isDeleting={isDeleting} isSelected={selectedItems.includes(data.id)} onSelect={handleSelectItem} toggleQuestDetailForm={toggleQuestDetail} />
                            })}
                        </span>

                        {!isDeleting && (
                            <span className="fixed bottom-5 right-mainTwoSidePadding">
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
                                        {`Xóa (${selectedItems.length})`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>

                {isCommunity && (<QuestCommunity toggleQuestCommunity={toggleQuestCommunity} openDetail={toggleQuestDetail} />)}
                {isQuestDetail && (<QuestDetail toggleQuestDetail={toggleQuestDetail} createQuestion={toggleQuestionForm} />)}
                {isQuestionForm && (<QuestionForm toggleForm={toggleQuestionForm} />)}
            </div>
        </IonPage>
    )
}

export default Quest