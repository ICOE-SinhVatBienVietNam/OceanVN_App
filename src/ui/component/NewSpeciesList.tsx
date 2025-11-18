// Import libraries
import React, { useState } from "react"
import { motion } from "framer-motion"

// Component
import { Discover_Card } from "../page/Discover"
import Funnel from "./Funnel"
import SpeciesDetail from "./SpeciesDetail"

// Interface
interface NewSpeciesList_interface {
    closeNewSpeciesList: () => void
}

// Main component
const NewSpeciesList: React.FC<NewSpeciesList_interface> = ({ closeNewSpeciesList }) => {
    // Funnel
    const [isFunnel, setIsFunnel] = useState<boolean>(false)

    const toggleFunnel = () => {
        setIsFunnel(!isFunnel)
    }

    // Species Detail
    const [isSpeciesDetail, setIsSpeciesDetail] = useState<boolean>(false)

    const toggleSpeciesDetail = () => {
        setIsSpeciesDetail(!isSpeciesDetail)
    }

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-0 h-full w-full flex flex-col bg-white px-mainTwoSidePadding pt-2.5"
        >
            <span className="sticky top-0 left-0 flex flex-col bg-white gap-2.5 pb-2.5">
                <span className="w-full">
                    <button className="mainShadow flex justify-center-safe items-center-safe h-7.5 aspect-square !rounded-full" onClick={closeNewSpeciesList}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <h2>Khám phá mới</h2>
                    <p className="text-csNormal text-mainRed">Số lượng: 50 loài</p>
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

                    <button className="mainShadow !p-2.5 !rounded-small" onClick={toggleFunnel}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>
                </span>
            </span>

            <span className="w-full flex-1 overflow-auto flex flex-wrap justify-between gap-2.5 px-0.5 py-2.5">
                {/* {Array(20).fill(0).map((_, index) => {
                    return <Discover_Card key={index} speciesDeatail={toggleSpeciesDetail} size="x1" />
                })} */}
            </span>

            {/* {isFunnel && (<Funnel closeFunnel={toggleFunnel} />)} */}
            {isSpeciesDetail && (<SpeciesDetail closeSpeciesDeatail={toggleSpeciesDetail} />)}
        </motion.div>
    )
}

export default NewSpeciesList