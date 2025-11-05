// Libraries
import React, { useState, useRef } from "react"
import { motion, useMotionValue, PanInfo } from "framer-motion"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Component
import Funnel from "./Funnel"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"

// Config
import { cloudinaryRoot } from "../../config/gateway"

// Type
import { SpeciesShortDetail } from "../../services/speciesService"

// Redux
import { setSpeciesDetailID } from "../../redux/state/speciesReducer"

// Card
interface Card_interface {
    speciesDeatail: () => void,
    species: SpeciesShortDetail
}

const Tag: React.FC<Card_interface> = ({ speciesDeatail, species }) => {
    const mainThumbnail = species.thumbnails.find(t => t.is_main)?.thumbnail;
    const dispatch = useDispatch()

    const chooseSpecies = () => {
        dispatch(setSpeciesDetailID(species.id))
        speciesDeatail()
    }

    return (
        <div
            onClick={chooseSpecies}
            className="w-full h-fit flex gap-2.5 items-center px-5 !border-[0.5px] border-lightGray py-1.5 rounded-main"
        >
            <span className="h-[50px] aspect-square overflow-hidden flex justify-center items-center">
                <img src={cloudinaryRoot + mainThumbnail} className="h-full w-full object-cover object-center" loading="lazy" />
            </span>

            <span className="flex-1">
                <p className="text-csNormal font-medium">{species.species}</p>
                <p className="flex items-center text-csSmall text-gray">{species.group}</p>
            </span>
        </div>
    )
}

const Card: React.FC<Card_interface> = ({ speciesDeatail, species }) => {
    const mainThumbnail = species.thumbnails.find(t => t.is_main)?.thumbnail;
    const dispatch = useDispatch()

    const chooseSpecies = () => {
        dispatch(setSpeciesDetailID(species.id))
        speciesDeatail()
    }

    return (
        <div
            onClick={chooseSpecies}
            className="relative mainShadow flex-shrink-0 overflow-hidden basis-[calc(25%-8px)] h-fit flex flex-col items-center-safe gap-2.5 rounded-main p-2.5"
        >
            <span className="w-full h-full aspect-square overflow-hidden flex justify-center items-center">
                <img src={cloudinaryRoot + mainThumbnail} loading="lazy" className="w-full h-full object-cover object-center" />
            </span>
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
    const [isCard, setIsCard] = useState<boolean>(true)
    const [isList, setIsList] = useState<boolean>(true)
    const [isFunnel, setIsFunnel] = useState<boolean>(false)

    const height = useMotionValue(isList ? window.innerHeight * 0.5 : 0);
    const lastHeight = useRef(window.innerHeight * 0.65);
    const minHeight = window.innerHeight * 0.2;
    const maxHeight = window.innerHeight * 0.9;

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const newHeight = height.get() - info.delta.y;
        if (newHeight > minHeight && newHeight < maxHeight) {
            height.set(newHeight);
            lastHeight.current = newHeight;
        }
    };

    // Data
    const speciesListDiscovered = useSelector((state: RootState) => state.species.speciesListDiscovered)

    // Toggle
    const toggleFunnel = () => {
        setIsFunnel(!isFunnel)
    }

    const toggleList = () => {
        if (isList) {
            height.set(0);
        } else {
            height.set(lastHeight.current);
        }
        setIsList(!isList);
    }

    return (
        <>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                style={{ height }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="mainShadow absolute z-10 bottom-0 left-0 flex w-full bg-white flex-col gap-2.5 pt-6"
            >
                <motion.div
                    onDrag={handleDrag}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    dragMomentum={false}
                    className="absolute top-0 left-0 w-full h-6 cursor-row-resize flex justify-center items-center"
                >
                    <div className="w-28 h-1.5 bg-gray-300 rounded-full" />
                </motion.div>

                <button
                    onClick={toggleList}
                    className={`absolute top-0 left-1/2 translate-y-[-120%] translate-x-[-50%] mainShadow ${isList ? "bg-white" : "bg-mainRed"} !px-2.5 !py-2.5 !rounded-small`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${!isList && "stroke-white"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>

                <div className="w-full flex justify-center-safe gap-2.5">
                    <button className="w-1/2 bg-mainRedRGB text-mainRed !py-1.5 !rounded-small" onClick={closeSpeciesList}>X</button>
                </div>

                <div className="flex-1 w-full h-0 gap-2.5 flex flex-col px-mainTwoSidePadding">
                    <span className="h-fit w-full flex justify-between items-center">
                        <span className="">
                            <h2 className="!leading-2.5">Sinh vật biển</h2>
                            <p className="text-gray text-csSmall">Tại khu vực bạn đang xem</p>
                        </span>

                        <span className="flex gap-2.5">
                            <button className="mainShadow !p-2 !rounded-small" onClick={() => { setIsCard(!isCard) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </button>

                            <button className="mainShadow !p-2 !rounded-small" onClick={toggleFunnel}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                            </button>
                        </span>
                    </span>

                    <p className="text-mainRed text-csSmall">Số lượng: {speciesListDiscovered.length} loài</p>

                    <span className={"w-full flex-1 overflow-auto flex flex-wrap content-start gap-x-2.5 gap-y-2.5 justify-start px-0.5 py-2.5"}>
                        {isCard
                            ? speciesListDiscovered.length > 0 && speciesListDiscovered.map((species, i) => <Card key={i} speciesDeatail={speciesDeatail} species={species} />)
                            : speciesListDiscovered.length > 0 && speciesListDiscovered.map((species, i) => <Tag key={i} speciesDeatail={speciesDeatail} species={species} />)}
                    </span>
                </div>
            </motion.div>

            {isFunnel && (<Funnel closeFunnel={toggleFunnel} />)}
        </>
    )
}

export default SpeciesList
