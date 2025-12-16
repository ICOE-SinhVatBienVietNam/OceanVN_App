// Import libraries
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import React, { lazy, useState } from "react"

// Images
import MyPostion from "../../assets/svg/MyPosition.svg"
import ChooseLocation from "../../assets/svg/ChooseLocation.svg"

// Toast
import { toastConfig, ToastType } from '../../config/toastConfig';
import { reportService } from '../../services/report';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addMyReport } from '../../redux/reducers/user';

// Component
const SnapMap = lazy(() => import("./SnapMap"))

// Progress Popup Component
interface ProgressPopup_interface {
    stage: 'uploading' | 'submitting' | 'completed' | 'error';
    onClose: () => void;
}

const ProgressPopup: React.FC<ProgressPopup_interface> = ({ stage, onClose }) => {
    const stageInfo = {
        uploading: {
            icon: <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainDark"></div>,
            message: "Đang tải ảnh..."
        },
        submitting: {
            icon: <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainDark"></div>,
            message: "Đang gửi báo cáo..."
        },
        completed: {
            icon: (
                <svg className="size-15 stroke-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            message: "Đã gửi báo cáo"
        },
        error: {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 stroke-mainRed">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            ),
            message: "Không thể gửi báo cáo"
        }
    };

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)] flex justify-center-safe items-center-safe px-mainTwoSidePadding z-60">
            <div className="w-[90%] bg-white flex flex-col gap-5 items-center-safe px-mainTwoSidePadding rounded-main py-5">
                <div className='w-full flex items-center gap-2.5'>
                    {stageInfo[stage].icon}
                    <span className='flex-1 flex flex-col'>
                        <h4 className="font-medium">{stageInfo[stage].message}</h4>
                        <p className='flex items-center-safe gap-1.5 text-csNormal font-medium text-gray'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                            </svg>

                            {new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                        </p>
                    </span>
                </div>

                {stage === 'completed' && (
                    <button
                        onClick={onClose}
                        className="w-full bg-mainRed text-white py-2.5! rounded-main!"
                    >
                        Đóng
                    </button>
                )}
            </div>
        </div>
    );
};


// Image Source Modal (similar to PhotoActionModal)
interface ImageSourceModal_interface {
    onClose: () => void;
    onSelect: (source: CameraSource) => void;
}

const ImageSourceModal: React.FC<ImageSourceModal_interface> = ({ onClose, onSelect }) => {
    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)] flex justify-center-safe items-center-safe px-mainTwoSidePadding z-50">
            <div className="w-[90%] bg-white flex flex-col gap-5 px-mainTwoSidePadding rounded-main py-5">
                <span className="flex flex-col gap-1.5 items-center-safe">
                    <h4 className="leading-0!">Chọn nguồn ảnh</h4>
                    <p className="text-csNormal text-gray">Bạn muốn chụp ảnh hay chọn từ thư viện?</p>
                </span>

                <span className="flex items-center-safe gap-2.5">
                    <button
                        onClick={() => onSelect(CameraSource.Camera)}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        <p className="text-csNormal font-medium">Camera</p>
                    </button>

                    <button
                        onClick={() => onSelect(CameraSource.Photos)}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l1.5 1.5a3 3 0 002.121.879H18a3 3 0 003-3V11.25a3 3 0 00-3-3H9.375a3 3 0 00-2.121.879l-1.5 1.5m-2.25 2.25l1.5 1.5a3 3 0 002.121.879H18a3 3 0 003-3V11.25a3 3 0 00-3-3H9.375a3 3 0 00-2.121.879l-1.5 1.5m-2.25 2.25L4.5 18.75a2.25 2.25 0 001.591.659H18.75a2.25 2.25 0 001.591-.659L21.75 15.75" />
                        </svg>
                        <p className="text-csNormal font-medium">Thư viện</p>
                    </button>
                </span>

                <span className="w-full">
                    <button
                        onClick={onClose}
                        className="w-full bg-mainRedRGB text-mainRed text-csMedium font-medium py-2.5! rounded-main!"
                    >
                        Hủy
                    </button>
                </span>
            </div>
        </div>
    )
}


// Confirm Location Form
interface ConfirmLocationForm_interface {
    confirm: (type: locationType) => void
}

const ConfirmLocationForm: React.FC<ConfirmLocationForm_interface> = ({ confirm }) => {
    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.75)] flex justify-center-safe items-center-safe px-mainTwoSidePadding z-50">
            <div className="bg-white flex flex-col gap-5 px-mainTwoSidePadding rounded-main py-2.5">
                <span className="flex flex-col gap-1.5 items-center-safe">
                    <h3 className="leading-0!">Xác nhận vị trí</h3>
                    <p className="text-csNormal text-gray">Vui lòng cung cấp vị trí xảy ra sự cố</p>
                </span>

                <span className="flex items-center-safe gap-2.5">
                    <span
                        onClick={() => { confirm("myLocation") }}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <img src={MyPostion} className="h-2/3!" />
                        <p className="text-csNormal font-medium">Vị trí của tôi</p>
                    </span>

                    <span
                        onClick={() => { confirm("map") }}
                        className="mainShadow w-full h-[120px] flex flex-col items-center-safe justify-center-safe gap-2.5 px-mainTwoSidePadding py-2.5 rounded-main"
                    >
                        <img src={ChooseLocation} className="h-2/3!" />
                        <p className="text-csNormal font-medium">Chọn trên bản đồ</p>
                    </span>
                </span>

                <span className="w-full">
                    <p className="text-csNormal text-center">Vị trí bạn cung cấp giúp chúng tôi xử lý báo cáo nhanh chóng và chính xác hơn.</p>
                </span>

                <span className="w-full">
                    <button
                        onClick={() => { confirm("") }}
                        className="w-full bg-mainRed text-white py-2.5! rounded-main!"
                    >
                        Quay lại
                    </button>
                </span>
            </div>
        </div>
    )
}

type locationType = "" | "myLocation" | "map"
type ProgressStage = 'idle' | 'uploading' | 'submitting' | 'completed' | 'error';

interface ReportForm_interface {
    onClose: (toast?: ToastType) => void // Renamed from toggleForm
}

const ReportForm: React.FC<ReportForm_interface> = ({ onClose }) => {
    // User
    const userId = useSelector((state: RootState) => state.user.user.id)

    const dispatch = useDispatch()

    const [photo, setPhoto] = useState<string | null>(null);
    const [isImageSourceModalOpen, setIsImageSourceModalOpen] = useState(false);
    const [isSnapMap, setIsSnapMap] = useState<boolean>(false)
    const [isConfirmForm, setIsConfirmForm] = useState<boolean>(false)
    const [progressStage, setProgressStage] = useState<ProgressStage>('idle');

    const takePicture = async (source: CameraSource) => {
        setIsImageSourceModalOpen(false); // Close modal after selection
        try {
            const image = await CapacitorCamera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: source,
                direction: source === CameraSource.Camera ? CameraDirection.Front : undefined
            });

            if (image.webPath) {
                console.log("Photo taken, webPath:", image.webPath); // DEBUG LOG
                setPhoto(image.webPath);
            } else {
                console.log("No image webPath received.");
            }
        } catch (error: any) {
            console.error("Error in takePicture:", error);
            if (error.message === "User cancelled photos app" || error.message === "No image selected") {
                console.log("User cancelled photo selection.");
            } else {
                toastConfig({
                    toastType: "error",
                    toastMessage: "Không thể mở camera hoặc thư viện"
                })
            }
        }
    };

    const reportInputLimitation = {
        'title': 50, //Character
        'content': 200 // Word
    }
    const [reportTitle, setReportTitle] = useState<string>('')
    const [reportContent, setReportContent] = useState<string>('')

    const changeText = (provider: 'title' | 'content', value: string) => {
        switch (provider) {
            case 'title':
                if (value.length <= reportInputLimitation.title) {
                    setReportTitle(value);
                }
                break;

            case 'content':
                // Đếm số từ, bỏ khoảng trắng thừa
                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount <= reportInputLimitation.content) {
                    setReportContent(value);
                }
                break;

            default:
                alert("Input không tồn tại");
                break;
        }
    };

    const resetForm = () => {
        setPhoto(null);
        setReportTitle('');
        setReportContent('');
    }

    const handleCloseProgressPopup = () => {
        setProgressStage('idle');
        onClose({
            toastMessage: "Gửi báo cáo thành công",
            toastType: "success"
        });
    };

    const handleSendReport = () => {
        console.log("hẹ hẹ hẹ")
        if (!photo && (!reportTitle || reportTitle.length === 0) && (!reportContent || reportContent.length === 0)) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng điền đầy đủ thông tin'
            })
            return
        }

        if(!photo) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng chụp ảnh hiện trường'
            })
            return
        }

        if(!reportTitle || reportTitle.length === 0) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng nhập tiêu đề'
            })
            return
        }

        if(!reportContent || reportContent.length === 0) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng nhập nội dung'
            })
            return
        }
        setIsConfirmForm(true)
    }

    const handleReportSubmit = async (coords: { lat: number, lng: number }) => {
        setIsSnapMap(false);
        setIsConfirmForm(false);

        // Stage 1: Processing Image
        setProgressStage('uploading');

        let imageFileForUpload = null;
        if (photo) {
            const response = await fetch(photo);
            const imageBlob = await response.blob();
            imageFileForUpload = new File([imageBlob], "captured_image.jpg", { type: imageBlob.type });
        }

        if (!imageFileForUpload) {
            return
        }

        // Upload image
        const imgUrl = await reportService.uploadImage(imageFileForUpload)

        if (!imgUrl) {
            setProgressStage("error")
            return
        }
        const reportData = {
            name: reportTitle,
            details: reportContent,
            attachment_paths: [imgUrl],
            lat: coords.lat,
            lng: coords.lng,
            user_id: userId
        };

        // Stage 2: Submitting report
        setProgressStage('submitting');
        const sendReport = await reportService.sendReportData(reportData)
        
        if (!sendReport) {
            setProgressStage("error")
            return
        }

        
        // Stage 3: Completed
        setProgressStage('completed');
        dispatch(addMyReport(sendReport))
    }

    const handleConfirmLocation = (type: locationType) => {
        setIsConfirmForm(false) // Close confirmation dialog immediately
        if (type === "map") {
            setIsSnapMap(true)
        } else if (type === "myLocation") {
            // Directly submit with current location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    handleReportSubmit({ lat: latitude, lng: longitude });
                }, () => {
                    alert("Không thể lấy vị trí của bạn. Vui lòng chọn trên bản đồ.");
                    // Optionally, open the map as a fallback
                    // setIsSnapMap(true);
                });
            } else {
                alert("Trình duyệt của bạn không hỗ trợ Geolocation. Vui lòng chọn trên bản đồ.");
                // Optionally, open the map as a fallback
                // setIsSnapMap(true);
            }
        }
    }

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 pt-2.5 z-40">
            <span className="w-full px-mainTwoSidePadding flex justify-end-safe">
                <button className="bg-mainRedRGB p-2! rounded-main!" onClick={() => { onClose() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 stroke-mainRed">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </span>

            <span className="flex-1 h-0 px-mainTwoSidePadding overflow-auto">
                <form onSubmit={(e) => e.preventDefault()}>
                    <span className="">
                        <h2 className="leading-0! py-2.5">Thông tin Báo cáo</h2>
                    </span>

                    <span className="w-full flex flex-col gap-5">
                        <span className="w-full flex flex-col gap-2.5">
                            {photo ? (
                                <img src={photo} alt="Selected" className="h-[200px] w-full object-cover bg-lightGray rounded-small" />
                            ) : (
                                <span className="h-[200px] bg-lightGray rounded-small flex justify-center-safe items-center-safe">
                                    <button type="button" onClick={() => setIsImageSourceModalOpen(true)} className="mainShadow h-[50px] aspect-square bg-mainLightBlue flex justify-center-safe items-center-safe rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 stroke-white fill-white">
                                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            )}

                            {photo && (
                                <span className="w-full flex items-center-safe gap-2.5">
                                    <button type="button" onClick={() => takePicture(CameraSource.Camera)} className="mainShadow w-2/5 h-10 bg-white text-csNormal font-medium flex items-center-safe justify-center-safe gap-2.5 border-[0.5px]! border-lightGray! rounded-small!">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                        </svg>
                                        Chụp lại
                                    </button>

                                    <button type="button" onClick={() => takePicture(CameraSource.Photos)} className="flex-1 h-10 text-white bg-mainDark text-csNormal flex items-center-safe justify-center-safe gap-2.5 rounded-small!">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                        Tải ảnh lên
                                    </button>
                                </span>
                            )}

                        </span>

                        <span className="w-full flex flex-col gap-2.5">
                            <span className="w-full">
                                <span className="w-full flex items-center justify-between">
                                    <p className="text-csMedium font-medium">Tiêu đề Báo cáo</p>
                                    <p className="text-csSmall text-gray">{reportTitle.length}/50 ký tự</p>
                                </span>
                                <input type="text" className="outline-none w-full text-csNormal! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" onChange={(e) => { changeText('title', e.target.value) }} value={reportTitle} />
                            </span>

                            <span className="w-full">
                                <span className="w-full flex items-center justify-between">
                                    <p className="text-csMedium font-medium">Nội dung Báo cáo</p>
                                    <p className="text-csSmall text-gray">{reportContent.trim().split(/\s+/).filter(Boolean).length}/200 từ</p>
                                </span>
                                <textarea className="outline-none resize-none w-full h-[200px]! text-csNormal! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" onChange={(e) => { changeText('content', e.target.value) }} value={reportContent}></textarea>
                            </span>
                        </span>
                    </span>
                </form>
            </span>

            <span className="px-mainTwoSidePadding flex gap-2.5 items-center-safe pb-2.5">
                <button type="button" onClick={resetForm} className="w-1/3 h-10 bg-white text-csNormal border-[0.5px]! border-lightGray! rounded-small!">Làm mới</button>

                <button
                    onClick={handleSendReport}
                    className="flex-1 h-10 text-white bg-mainRed text-csNormal flex items-center-safe justify-center-safe gap-2.5 rounded-small!"
                >
                    Gửi Báo cáo
                </button>
            </span>

            {isConfirmForm && (<ConfirmLocationForm confirm={handleConfirmLocation} />)}
            {isSnapMap && (<SnapMap getPosition={handleReportSubmit} onClose={() => setIsSnapMap(false)} />)}
            {isImageSourceModalOpen && (<ImageSourceModal onClose={() => setIsImageSourceModalOpen(false)} onSelect={takePicture} />)}
            {progressStage !== 'idle' && (<ProgressPopup stage={progressStage} onClose={handleCloseProgressPopup} />)}
        </div>
    )
}

export default ReportForm