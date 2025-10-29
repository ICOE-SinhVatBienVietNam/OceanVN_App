// Import libraries
import React, { useState } from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router"

// Config
import { routeConfig } from "../../config/routeConfig"
import { threatenedSpecies } from "../../config/threatenedSpecies"

// Images
import Logo from "../../assets/SinhVatBienVN.png"
import { useIonRouter } from "@ionic/react"

interface SpeciesDetail_interface {
    isShowLocation: boolean,
    closeSpeciesDeatail: () => void,
    speciesLocation?: () => void
}

const SpeciesDetail: React.FC<SpeciesDetail_interface> = ({ isShowLocation, closeSpeciesDeatail, speciesLocation }) => {
    // threatenedSpecies
    const [threatenedLevel, setThreatenedLevel] = useState<number>(5)

    // Location path
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

    const [isCloseSpeciesDeatail, setIsCloseSpeciesDeatail] = useState<boolean>(false)
    const handleCloseSpeciesDetail = () => {
        setIsCloseSpeciesDeatail(true)
        setTimeout(() => {
            closeSpeciesDeatail()
        }, 200)
    }

    return (
        <motion.div
            initial={{ x: !isCloseSpeciesDeatail ? "100%" : 0 }}
            animate={{ x: !isCloseSpeciesDeatail ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mainShadow absolute z-10 bottom-0 left-0 h-full w-full bg-white flex flex-col gap-5 pt-2.5"
        >
            <span className="flex justify-between items-center px-mainTwoSidePadding">
                <button className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full" onClick={handleCloseSpeciesDetail}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <span className="w-fit flex items-center gap-1.5">
                    {!isShowLocation && (
                        <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small" onClick={viewMorePosition}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                            Phân bố
                        </button>
                    )}

                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </button>

                    <button className="mainShadow flex items-center text-csNormal gap-1 !p-2.5 !rounded-small">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>

                    </button>
                </span>
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

                <span className="w-full flex border border-lighterGray mt-5">
                    {threatenedSpecies.map((level, index) => {
                        return (
                            <span key={index} className={`relative flex-1 h-3 ${index <= threatenedLevel && level.color}`}>
                                {index === threatenedLevel && (
                                    <>
                                        <p className="absolute bottom-full left-1/2 h-fit w-fit translate-x-[-50%] translate-y-[-20%] text-nowrap font-medium text-csNormal">{level.code}</p>
                                        <p className="absolute top-full left-1/2 h-fit w-fit translate-x-[-50%] translate-y-[20%] text-nowrap font-medium text-csNormal">{level.label}</p>
                                    </>
                                )}
                            </span>
                        )
                    })}
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
                        <h5 className="font-semibold text-lg">Vai trò</h5>
                        <p className="text-gray text-justify pl-2.5">Loài này có những lợi ích cho con người, cho môi trường biển...</p>
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
                            <li className="text-gray"><span className="font-bold text-gray">Miền Bắc:</span> Tên gọi</li>
                            <li className="text-gray"><span className="font-bold text-gray">Miền Trung:</span> Tên gọi</li>
                            <li className="text-gray"><span className="font-bold text-gray">Miền Nam:</span> Tên gọi</li>
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
