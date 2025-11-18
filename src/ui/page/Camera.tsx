// Import libraries
import React, { lazy, useState } from "react"
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { IonPage } from "@ionic/react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Components
import ContributionForm from "../component/ContributionForm"
import PhotoActionModal from "../component/PhotoActionModal";
const CameraStorageDetail = lazy(() => import('../component/CameraStorageDetail'))

// Toast interface
import { ToastType } from "../layout/MainLayout"
import { toastConfig } from "../../config/toastConfig"

const StorageCard: React.FC<{
    id: number,
    isDeleting: boolean,
    isSelected: boolean,
    onSelect: (id: number) => void,
    toggleCameraStorageDetail: () => void
}> = ({ id, isDeleting, isSelected, onSelect, toggleCameraStorageDetail }) => {
    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            toggleCameraStorageDetail()
        }
    }

    return (
        <span className="relative mainShadow flex-shrink-0 basis-[calc(33.333%-8px)] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="w-full flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>
        </span>
    )
}

const ContributeCard: React.FC<{
    id: number,
    isDeleting: boolean,
    isSelected: boolean,
    onSelect: (id: number) => void,
    toggleCameraStorageDetail: () => void
}> = ({ id, isDeleting, isSelected, onSelect, toggleCameraStorageDetail }) => {
    const handleClick = () => {
        if (isDeleting) {
            onSelect(id)
        } else {
            toggleCameraStorageDetail()
        }
    }

    return (
        <span className="relative mainShadow flex-shrink-0 basis-[calc(33.333%-8px)] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5" onClick={handleClick}>
            {isDeleting && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="absolute top-2 left-2 w-4 h-4 accent-mainBlue"
                />
            )}
            <span className="w-full flex-1 flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>

            <span className="w-full flex flex-col items-center-safe gap-2.5">
                {/* <p className="text-csNormal text-center">Tiêu đề hình ảnh</p> */}
                <p className="text-csTiny min-sm:text-csNormal text-gray font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 fill-gray">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>

                    22/10/2025
                </p>
            </span>
        </span>
    )
}

// Main component
const Camera: React.FC = () => {
    // State 
    const [isSaved, setIsSaved] = useState<boolean>(true)
    const [isNew, setIsNew] = useState<boolean>(false)
    const [isCameraStorageDetail, setIsCameraStorageDetail] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [photo, setPhoto] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                direction: source === CameraSource.Camera ? CameraDirection.Front : undefined
            });

            if (image.webPath) {
                setPhoto(image.webPath);
                setIsNew(true);
            }
        } catch (error: any) { // Explicitly type error as 'any' for message property
            if (error.message === "User cancelled photos app" || error.message === "No image selected") {
                console.log("User cancelled photo selection.");
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
        <IonPage>
            <div className="relative h-full w-full flex flex-col pt-2.5 gap-2.5">
                <span className="w-full px-mainTwoSidePadding">
                    <span className=" mainShadow p-[0.5px] w-full h-[40px] bg-lightGray flex rounded-main">
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
                        <span className="w-full">
                            <h2>{isSaved ? "Ảnh của tôi" : "Đóng góp của tôi"}</h2>
                            <p className="text-csNormal text-mainRed font-medium">Số lượng: 50 {isSaved ? "ảnh" : "đóng góp"}</p>
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

                    <div className="w-full flex-1 overflow-auto flex flex-wrap justify-start gap-2.5 px-0.5 py-2.5">
                        {isSaved
                            ? Array(20)
                                .fill(0)
                                .map((_, i) => <StorageCard key={i} id={i} isDeleting={isDeleting} isSelected={selectedItems.includes(i)} onSelect={handleSelectItem} toggleCameraStorageDetail={toggleCameraStorageDetail} />)
                            : Array(20)
                                .fill(0)
                                .map((_, i) => <ContributeCard key={i} id={i} isDeleting={isDeleting} isSelected={selectedItems.includes(i)} onSelect={handleSelectItem} toggleCameraStorageDetail={toggleCameraStorageDetail} />)
                        }
                    </div>
                </span>

                {!isDeleting && (
                    <span className="absolute bottom-5 right-mainTwoSidePadding">
                        <button className="mainShadow h-[50px] aspect-square bg-mainLightBlue flex justify-center-safe items-center-safe rounded-full" onClick={() => setIsModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 stroke-white fill-white">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                )}

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
                                {`Xóa(${selectedItems.length})`}
                            </button>
                        </div>
                    </div>
                )}

                {isNew && (<ContributionForm toggleForm={toggleForm} image={photo} onRetake={takePicture} />)}
                {isCameraStorageDetail && (<CameraStorageDetail toggleCameraStorageDetail={toggleCameraStorageDetail} />)}
                {isModalOpen && <PhotoActionModal onClose={() => setIsModalOpen(false)} onSelect={handleSelectPhotoSource} />}
            </div>
        </IonPage>
    )
}

export default Camera
