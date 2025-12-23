import React from "react"
import { motion } from "framer-motion"

// Images
import { useConfirm } from "../../hooks/ConfirmForm"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { MapResizeHandler, MyPositionMarker } from "../page/Map"
import { cloudinaryRoot } from "../../config/gateway"
import { ContributionService } from "../../services/contributionService"
import { setContributionDetail, setContributionDetailId } from "../../redux/state/contributionReducer"

interface CameraStorageDetail_interface {
    toggleCameraStorageDetail: () => void
}

const CameraStorageDetail: React.FC<CameraStorageDetail_interface> = ({ toggleCameraStorageDetail }) => {
    const confirm = useConfirm()
    const contributionDetailData = useSelector((state: RootState) => state.contribution.contributionDetail)
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch()

    const handleDelete = async () => {
        const confirmDelete = await confirm({ title: `Xóa`, message: "Bạn muốn xóa mục này?" })

        if (confirmDelete && contributionDetailData) {
            const isDelete = await ContributionService.deleteContribution([contributionDetailData.id], user?.id)
            if (isDelete) {
                dispatch(setContributionDetailId({ id: null }))
                dispatch(setContributionDetail({ contributionData: null }))
                toggleCameraStorageDetail()
            }
        }
    }

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-full bg-white flex flex-col gap-2.5 pt-2.5"
        >
            <div className="h-fit w-full flex justify-between items-center-safe px-mainTwoSidePadding">
                <button className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full" onClick={toggleCameraStorageDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button className="bg-mainRedRGB !px-10 !py-2 !rounded-main" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 stroke-mainRed">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 h-0 overflow-auto flex flex-col gap-2.5 px-mainTwoSidePadding pt-0.5">
                <div className="h-fit w-full">
                    <p className="text-csNormal font-medium text-gray">Ngày tạo: {contributionDetailData && new Date(contributionDetailData?.created_at).toLocaleString("vi-VN")}</p>
                </div>

                <div className="h-fit w-full">
                    <span className="mainShadow !h-[200px] flex-shrink-0 flex justify-center items-center p-2.5 rounded-main overflow-hidden">
                        <img src={cloudinaryRoot + contributionDetailData?.thumbnail} className="object-cover object-center" />
                    </span>
                </div>

                <div className="h-fit w-full flex flex-col items-center-safe py-2.5">
                    <h4 className="!leading-0 !font-medium uppercase">{contributionDetailData?.title}</h4>
                </div>

                <div className="h-fit w-full">
                    <h4>Mô tả</h4>
                    <span className="w-full">
                        <p className="text-gray text-justify pl-2.5">{contributionDetailData?.body}</p>
                    </span>
                </div>

                {contributionDetailData?.is_contributed && contributionDetailData.latitude && contributionDetailData.longtitude && (
                    <div className="h-fit w-full">
                        <h4>Vị trí bức ảnh</h4>

                        <div className="mainShadow h-fit">
                            <MapContainer
                                center={[contributionDetailData.latitude, contributionDetailData.longtitude]}
                                zoom={12}
                                style={{ height: "300px", width: "100%", position: "relative" }}
                                className="z-0"
                                // ref={mapRef}
                                zoomControl={false}
                            >
                                <MapResizeHandler />
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    attribution="&copy; OpenStreetMap contributors &copy; CARTO"
                                />

                                <MyPositionMarker position={[contributionDetailData.latitude, contributionDetailData.longtitude]} />
                            </MapContainer>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default CameraStorageDetail