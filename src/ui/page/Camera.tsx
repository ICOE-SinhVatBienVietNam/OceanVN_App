// Import libraries
import React, { lazy, useEffect, useState } from "react"
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { IonPage, useIonRouter } from "@ionic/react"

// Components
import ContributionForm from "../component/ContributionForm"
import PhotoActionModal from "../component/PhotoActionModal";
import CameraStorageDetail from "../component/CameraStorageDetail";

// Toast interface
import { ToastType } from "../layout/MainLayout"
import { toastConfig } from "../../config/toastConfig"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { routeConfig } from "../../config/routeConfig";
import { ContributionService } from "../../services/contributionService";
import { ContributionData, resetData, setContributionDetail, setContributionDetailId, setPage } from "../../redux/state/contributionReducer";
import { cloudinaryThumbnail, noImageURL } from "../../config/gateway";
import { useDebounce } from "../../hooks/Debounce";
import { useConfirm } from "../../hooks/ConfirmForm";

const Card: React.FC<{
    id: string,
    isDeleting: boolean,
    cardData: ContributionData,
    isSelected: boolean,
    onSelect: (id: string) => void,
    toggleCameraStorageDetail: () => void
}> = ({ id, isDeleting, isSelected, cardData, onSelect, toggleCameraStorageDetail }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            dispatch(setContributionDetailId({ id: id }))
            dispatch(setContributionDetail({ contributionData: cardData }))
            toggleCameraStorageDetail()
        }
    }

    return (
        <span className="relative mainShadow flex-shrink-0 basis-[calc(50%-5px)] flex flex-col gap-2.5 rounded-main px-2.5 py-5 transition-all" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="w-full flex-1 flex justify-center-safe items-center-safe overflow-hidden">
                <img src={cloudinaryThumbnail + cardData.thumbnail} className="object-cover object-center" onError={(e) => { e.currentTarget.src = noImageURL }} />
            </span>

            <span className="w-full flex flex-col items-center-safe gap-2.5">
                <span className="w-full">
                    <p className="w-full text-csNormal font-medium line-clamp-2 break-all">{cardData.title}</p>
                </span>

                <span className="w-full h-fit flex flex-col gap-1">
                    {cardData.is_contibuted ? (
                        <p className="w-full text-csSmall min-sm:text-csNormal text-mainRed font-medium flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-mainRed">
                                <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            </svg>

                            Đã đóng góp
                        </p>
                    ) : (

                        <p className="w-full text-csSmall min-sm:text-csNormal text-mainLightBlue font-medium flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-mainLightBlue">
                                <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                                <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                                <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                                <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                            </svg>

                            Đã lưu
                        </p>
                    )}

                    <p className="text-csSmall min-sm:text-csNormal text-gray font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-gray">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                        </svg>

                        {new Date(cardData.created_at).toLocaleString("vi-VN")}
                    </p>
                </span>
            </span>
        </span>
    )
}

const CameraUnAuth: React.FC = () => {
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

// Main component
const Camera: React.FC = () => {
    // State 
    const [isSaved, setIsSaved] = useState<boolean>(true)
    const [isNew, setIsNew] = useState<boolean>(false)
    const [isCameraStorageDetail, setIsCameraStorageDetail] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [photo, setPhoto] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth)

    // Get data
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const page = useSelector((state: RootState) => state.contribution.page)
    const contributionData = useSelector((state: RootState) => state.contribution.data)
    const totalPage = useSelector((state: RootState) => state.contribution.totalPage)
    const total = useSelector((state: RootState) => state.contribution.total)
    const [search, setSearch] = useState<string>("")
    const debounceSearch = useDebounce(search, 1000)

    useEffect(() => {
        dispatch(resetData());
        if (user) {
            (async () => {
                await ContributionService.getContribution(user.id, 1, 10, !isSaved, debounceSearch, "DESC");
            })();
        }
    }, [isSaved, user, dispatch, debounceSearch]);

    useEffect(() => {
        if (!user || page === 1) return;
        (async () => {
            await ContributionService.getContribution(user.id, page, 10, !isSaved, debounceSearch, "DESC");
        })();
    }, [user, page, dispatch, debounceSearch]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!user) return;
        const target = e.currentTarget;
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
            if (page < totalPage && contributionData.length < total) {
                dispatch(setPage(page + 1));
            }
        }
    };

    const changeList = (type: boolean) => {
        setIsSaved(type)
    }

    const toggleForm = (toast?: ToastType) => {
        setIsNew(!isNew)

        if (!isNew) {
            setPhoto(null);
        }

        if (toast) {
            toastConfig(toast)
        }
    }

    const handleSelectPhotoSource = (source: CameraSource) => {
        setIsModalOpen(false);
        takePicture(source);
    };

    const takePicture = async (source: CameraSource) => {
        try {
            const image = await CapacitorCamera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: source,
                direction: source === CameraSource.Camera ? CameraDirection.Rear : undefined
            });

            if (image.webPath) {
                setPhoto(image.webPath);
                setIsNew(true);
            }
        } catch (error: any) { // Explicitly type error as 'any' for message property
            if (error.message === "User cancelled photos app" || error.message === "No image selected") {
                console.error("User cancelled photo selection.");
            } else {
                console.error("Error taking picture: ", error);
                toastConfig({
                    toastType: "error",
                    toastMessage: "Không thể mở camera hoặc thư viện"
                })
            }
        }
    };

    const toggleCameraStorageDetail = () => {
        setIsCameraStorageDetail(!isCameraStorageDetail)
    }

    const toggleIsDeleting = () => {
        setIsDeleting(!isDeleting)
        setSelectedItems([])
    }

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    }

    const confirm = useConfirm()
    const handleDelete = async () => {
        const confirmDelete = await confirm({ title: `Xóa ${selectedItems.length} mục`, message: "Hành động sẽ không được khôi phục" })

        if (confirmDelete) {
            toggleIsDeleting()
            await ContributionService.deleteContribution(selectedItems, user?.id)
            setSelectedItems([])
        }
    }

    search

    return (
        <IonPage>
            <div className="relative h-full w-full flex flex-col pt-2.5 gap-7">
                <span className="w-full px-mainTwoSidePadding">
                    <span className="mainShadow p-[0.5px] w-full h-[40px] bg-lightGray flex rounded-main">
                        <button
                            onClick={() => { changeList(true) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${isSaved ? "bg-white" : "bg-transparent"} !rounded-main`}
                        >
                            Đã lưu
                        </button>

                        <button
                            onClick={() => { changeList(false) }}
                            className={`text-csNormal font-medium h-full w-1/2 ${!isSaved ? "bg-white" : "bg-transparent"} !rounded-main`}
                        >
                            Đã đóng góp
                        </button>
                    </span>
                </span>

                <span className="flex-1 h-0 flex flex-col px-mainTwoSidePadding">
                    <span className="flex flex-col bg-white gap-2.5 pb-2.5">
                        <span className="w-full flex">
                            <span className="flex-1 flex flex-col gap-2.5">
                                <h2 className="leading-none! my-0!">{isSaved ? "Ảnh của tôi" : "Đóng góp của tôi"}</h2>
                                <p className="text-csNormal text-mainRed font-medium">Số lượng: {total} {isSaved ? "ảnh" : "đóng góp"}</p>
                            </span>
                            {!isDeleting && (
                                <span>
                                    <button className="flex gap-1.5 items-center-safe bg-mainLightBlue text-white text-csNormal px-3.5! py-2.5! rounded-small!" onClick={() => setIsModalOpen(true)}>
                                        {isSaved ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-white">
                                                <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                                                <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                                                <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                                                <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-white">
                                                <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                                            </svg>
                                        )}


                                        {isSaved ? "Thêm ảnh" : "Đóng góp"}
                                    </button>
                                </span>
                            )}
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

                    <div
                        onScroll={handleScroll}
                        className="w-full flex-1 h-0 overflow-auto flex flex-wrap justify-start content-start gap-2.5 px-0.5 py-2.5"
                    >
                        {isAuth && contributionData.map((contribution) => {
                            return <Card key={contribution.id} id={contribution.id} cardData={contribution} isDeleting={isDeleting} isSelected={selectedItems.includes(contribution.id)} onSelect={handleSelectItem} toggleCameraStorageDetail={toggleCameraStorageDetail} />
                        })}
                    </div>
                </span>

                {isDeleting && (
                    <div className="absolute bottom-0 w-full px-mainTwoSidePadding py-2.5 bg-white drop-shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
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

                {isNew && (<ContributionForm toggleForm={toggleForm} image={photo} onRetake={takePicture} />)}
                {isCameraStorageDetail && (<CameraStorageDetail toggleCameraStorageDetail={toggleCameraStorageDetail} />)}
                {isModalOpen && <PhotoActionModal onClose={() => setIsModalOpen(false)} onSelect={handleSelectPhotoSource} />}
                {!isAuth && (
                    <CameraUnAuth />
                )}
            </div>
        </IonPage >
    )
}

export default Camera
