// Import libraries
import React, { useState } from "react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Components
import ContributionForm from "../component/ContributionForm"

const StorageCard: React.FC = () => {
    return (
        <span className="mainShadow flex-shrink-0 w-[48%] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5">
            <span className="w-full h-[100px] flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>

            <span className="w-full flex flex-col items-center-safe gap-2.5">
                <p className="text-csNormal text-center">Tiêu đề hình ảnh</p>
            </span>
        </span>
    )
}

const ContributeCard: React.FC = () => {
    return (
        <span className="mainShadow flex-shrink-0 w-[48%] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5">
            <span className="w-full h-[100px] flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>

            <span className="w-full flex flex-col items-center-safe gap-2.5">
                <p className="text-csNormal text-center">Tiêu đề hình ảnh</p>
                <p className="text-csSmall text-gray font-medium flex items-center gap-1">
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

    const changeList = () => {
        setIsSaved(!isSaved)
    }

    const toggleForm = () => {
        setIsNew(!isNew)
    }

    return (
        <div className="relative h-full w-full flex flex-col pt-2.5 gap-2.5">
            <span className="w-full px-mainTwoSidePadding">
                <span className=" mainShadow p-[0.5px] w-full h-[40px] bg-lightGray flex rounded-main">
                    <button
                        onClick={changeList}
                        className={`text-csNormal font-medium h-full w-1/2 ${isSaved ? "bg-white" : "bg-transparent"} !rounded-main`}
                    >
                        Đã lưu
                    </button>

                    <button
                        onClick={changeList}
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
                    </span>
                </span>

                <div className="w-full flex-1 overflow-auto flex flex-wrap justify-between gap-2.5 px-0.5 py-2.5">
                    {isSaved
                        ? Array(20)
                            .fill(0)
                            .map((_, i) => <StorageCard key={i} />)
                        : Array(20)
                            .fill(0)
                            .map((_, i) => <ContributeCard key={i} />)
                    }
                </div>
            </span>

            <span className="absolute bottom-5 right-mainTwoSidePadding">
                <button className="mainShadow h-[50px] aspect-square bg-mainLightBlue flex justify-center-safe items-center-safe rounded-full" onClick={toggleForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 stroke-white fill-white">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                </button>
            </span>

            {isNew && (<ContributionForm toggleForm={toggleForm} />)}
        </div>
    )
}

export default Camera
