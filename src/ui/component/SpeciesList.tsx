// Libraries
import React, { useState } from "react"
import { motion } from "framer-motion"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Component
import Funnel from "./Funnel"

// Card
type CardProp = {
    name: string,
    location: string,
    thumbnail: string | string[]
}

interface Card_interface {
    speciesDeatail: () => void
}

const Tag: React.FC<Card_interface> = ({ speciesDeatail }) => {
    return (
        <div
            onClick={speciesDeatail}
            className="w-full flex gap-2.5 items-center px-5 !border-[0.5px] border-lightGray py-3 rounded-main"
        >
            <span className="mainShadow h-[50px] aspect-square overflow-hidden flex justify-center items-center rounded-full">
                <img src={Logo} className="h-[60px]" />
            </span>

            <span className="flex-1">
                <p className="">Tên sinh vật biển</p>
                <p className="flex items-center text-csNormal text-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>

                    Vũng tàu, TP.HCM
                </p>
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-mainDarkBlue">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    )
}

const Card: React.FC<Card_interface> = ({ speciesDeatail }) => {
    return (
        <div
            onClick={speciesDeatail}
            className="mainShadow min-w-[30%] flex-1 flex flex-col items-center p-2.5 rounded-main gap-2.5"
        >
            <span className="h-[50px] aspect-square overflow-hidden flex justify-center items-center rounded-full">
                <img src={Logo} />
            </span>

            <p className="text-csNormal">Tên sinh vật</p>
        </div>
    )
}


// Main component
interface SpeciesList_interface {
    closeSpeciesList: () => void,
    speciesDeatail: () => void
}

const SpeciesList: React.FC<SpeciesList_interface> = ({
    closeSpeciesList, speciesDeatail
}) => {
    // State
    const [isCard, setIsCard] = useState<boolean>(false) // Change style list
    const [isList, setIsList] = useState<boolean>(true)
    const animatedHeight = isList ? "75vh" : "0vh"
    const [isFunnel, setIsFunnel] = useState<boolean>(false)

    // Toggle
    const toggleFunnel = () => {
        setIsFunnel(!isFunnel)
    }

    return (
        <>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0, height: animatedHeight }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="mainShadow absolute z-10 bottom-0 left-0 flex w-full bg-white flex-col gap-2.5 pt-2.5"
            >
                <button
                    onClick={() => { setIsList(!isList) }}
                    className={`absolute top-0 left-1/2 translate-y-[-120%] translate-x-[-50%] mainShadow ${isList ? "bg-white" : "bg-mainRed"} !px-2.5 !py-2.5 !rounded-small`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${!isList && "stroke-white"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                <div className="w-full flex justify-center-safe gap-2.5">
                    <button className="w-1/2 bg-mainRed text-white !py-2.5 !rounded-small" onClick={closeSpeciesList}>X</button>
                </div>

                <div className="flex-1 w-full h-0 gap-2.5 flex flex-col px-mainTwoSidePadding">
                    <span className="h-fit w-full flex justify-between items-center">
                        <span className="">
                            <h1 className="!leading-2.5">Sinh vật biển</h1>
                            <p className="text-gray text-csNormal">Tại khu vực bạn đang xem</p>
                        </span>

                        <span className="flex gap-2.5">
                            <button className="mainShadow !p-2.5 !rounded-small" onClick={() => { setIsCard(!isCard) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </button>

                            <button className="mainShadow !p-2.5 !rounded-small" onClick={toggleFunnel}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                            </button>
                        </span>
                    </span>

                    <p className="text-mainRed text-csNormal">Số lượng: 500 loài</p>

                    <span className="w-full flex-1 h-0 overflow-auto flex flex-wrap gap-2.5 py-2.5 px-0.5">
                        {isCard
                            ? Array(20)
                                .fill(0)
                                .map((_, i) => <Card key={i} speciesDeatail={speciesDeatail} />)
                            : Array(20)
                                .fill(0)
                                .map((_, i) => <Tag key={i} speciesDeatail={speciesDeatail} />)}
                    </span>
                </div>
            </motion.div>

            {isFunnel && (<Funnel closeFunnel={toggleFunnel} />)}
        </>
    )
}

export default SpeciesList
