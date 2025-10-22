// Import libraries
import React from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router"

// Config
import { routeConfig } from "../../config/routeConfig"

// Images
import Logo from "../../assets/SinhVatBienVN.png"
import { useIonRouter } from "@ionic/react"

interface SpeciesDetail_interface {
    isShowLocation: boolean,
    closeSpeciesDeatail: () => void,
    speciesLocation?: () => void
}

const SpeciesDetail: React.FC<SpeciesDetail_interface> = ({ isShowLocation, closeSpeciesDeatail, speciesLocation }) => {
    const location = useLocation()
    const router = useIonRouter()

    const viewMorePosition = () => {
        switch (location.pathname) {
            case routeConfig.main.discover:
                router.push(routeConfig.main.map + "/123")
                break;

            default:
                if (speciesLocation) {
                    speciesLocation()
                }
                break;
        }
    }

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mainShadow absolute z-10 bottom-0 left-0 h-full w-full bg-white flex flex-col gap-5 pt-2.5"
        >
            <span className="flex justify-between items-center px-mainTwoSidePadding">
                <button className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full" onClick={closeSpeciesDeatail}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {!isShowLocation && (
                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small" onClick={viewMorePosition}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159-1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>

                        Vị trí phân bố
                    </button>
                )}
            </span>

            <span className="flex-1 h-0 flex flex-col overflow-y-auto gap-2.5 pb-2.5 pt-0.5 px-mainTwoSidePadding">
                <div className="flex flex-wrap gap-2.5 mb-2.5">
                    <button className="mainShadow text-csNormal !py-1 !px-2.5 !rounded-small">Tên bộ (30)</button>
                    <button className="mainShadow text-csNormal !py-1 !px-2.5 !rounded-small">Tên họ (15)</button>
                    <button className="mainShadow text-csNormal !py-1 !px-2.5 !rounded-small">Tên loài (1)</button>
                </div>

                <span className="mainShadow !h-[200px] flex-shrink-0 flex justify-center items-center p-2.5 rounded-main overflow-hidden">
                    <img src={Logo} className="h-full" />
                </span>

                <span className="flex flex-col items-center-safe py-2.5">
                    <h4 className="!leading-0 !font-medium uppercase">Tên thông dụng</h4>
                    <p className="text-csBig text-gray">Tên khoa học</p>
                    <p className="text-csNormal text-mainDark font-medium flex items-center-safe gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-mainDark">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>

                        Vũng Tàu, TP.HCM
                    </p>
                </span>

                <span className="flex flex-col gap-2.5 text-csNormal">
                    <span className="flex flex-col">
                        <h5 className="font-semibold text-lg">Mô tả</h5>
                        <p className="text-gray text-justify pl-2.5">Đây là mô tả chi tiết về loài sinh vật biển này, bao gồm các thông tin về hình dáng, tập tính, và môi trường sống của chúng.</p>
                    </span>

                    <span className="flex flex-col">
                        <h5 className="font-semibold text-lg">Đặc điểm</h5>
                        <p className="text-gray text-justify pl-2.5">Loài này có những đặc điểm nổi bật như màu sắc, kích thước, và các bộ phận đặc trưng giúp nhận dạng.</p>
                    </span>

                    <span className="flex flex-col">
                        <h5 className="font-semibold text-lg">Phân loại sinh học</h5>
                        <ul className="list-none text-gray pl-2.5">
                            <li className="text-gray"><span className="font-bold text-gray">Bộ:</span> Tên bộ</li>
                            <li className="text-gray"><span className="font-bold text-gray">Họ:</span> Tên họ</li>
                            <li className="text-gray"><span className="font-bold text-gray">Loài:</span> Tên loài</li>
                        </ul>
                    </span>

                    <span className="flex flex-col">
                        <h5 className="font-semibold text-lg">Tên gọi khác</h5>
                        <ul className="list-none text-gray pl-2.5">
                            <li className="text-gray"><span className="font-bold text-gray">Bộ:</span> Tên bộ</li>
                            <li className="text-gray"><span className="font-bold text-gray">Họ:</span> Tên họ</li>
                            <li className="text-gray"><span className="font-bold text-gray">Loài:</span> Tên loài</li>
                        </ul>
                    </span>

                    <span className="flex flex-col">
                        <h5 className="font-semibold text-lg">Tham khảo</h5>
                        <ul className="list-none text-gray pl-2.5">
                            <li className="text-gray"><span className="font-bold text-gray">Nguồn</span> Trích nguồn</li>
                            <li className="text-gray"><span className="font-bold text-gray">Nguồn</span> Trích nguồn</li>
                            <li className="text-gray"><span className="font-bold text-gray">Nguồn</span> Trích nguồn</li>
                        </ul>
                    </span>
                </span>
            </span>
        </motion.div>
    )
}

export default SpeciesDetail
