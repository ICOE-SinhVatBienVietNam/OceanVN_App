// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Component
import Funnel from "../component/Funnel"
import NewSpeciesList from "../component/NewSpeciesList"
import SpeciesDetail from "../component/SpeciesDetail"

// Card
type sizesType = "x0.5" | "x0.75" | "x1"

interface Card_interface {
    speciesDeatail: () => void
    size?: sizesType
}

export const Discover_NewCard: React.FC<Card_interface> = ({ speciesDeatail }) => {
    return (
        <span className="mainShadow flex-shrink-0 !w-[130px] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5" onClick={speciesDeatail}>
            <span className="w-full h-[60px] flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>

            <span className="w-full flex flex-col items-center-safe gap-2.5">
                <p className="text-csSmall text-center">Ipomoea pes-caprae (L.) R. Br. 1818</p>
                <p className="text-csTiny text-gray font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-2 fill-gray">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>

                    Vũng Tàu, TP.HCM
                </p>
            </span>
        </span>
    )
}

export const Discover_Card: React.FC<Card_interface> = ({ speciesDeatail, size }) => {
    const [textSize, setTextSize] = useState<{
        style: string,
        info: boolean
    }>()

    // Logic
    useEffect(() => {
        let style: typeof textSize = {
            style: "",
            info: false
        }

        switch (size) {
            case 'x0.5':
                style = {
                    style: "flex-1/5",
                    info: true
                }
                setTextSize(style)
                break;

            case 'x0.75':
                style = {
                    style: "flex-1/4",
                    info: true
                }
                setTextSize(style)
                break;

            case 'x1':
                style = {
                    style: "w-[48%]",
                    info: false
                }
                setTextSize(style)
                break;
        }

    }, [size])


    return (
        <span className={`mainShadow flex-shrink-0 ${textSize?.style} h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5`} onClick={speciesDeatail}>
            <span className="w-full h-auto flex justify-center-safe items-center-safe">
                <img src={Logo} className="!h-full" />
            </span>

            {!textSize?.info && (
                <span className="w-full flex flex-col items-center-safe gap-2.5">
                    <p className="text-csSmall text-center">Ipomoea pes-caprae (L.) R. Br. 1818</p>
                    <p className="text-csTiny text-gray font-medium flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-2 fill-gray">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>

                        Vũng Tàu, TP.HCM
                    </p>
                </span>
            )}
        </span>
    )
}

// Main component
const Discover: React.FC = () => {
    // NewSpeciesList
    const [isNewSpeciesList, setIsNewSpeciesList] = useState<boolean>(false)

    const toggleNewSpeciesList = () => {
        setIsNewSpeciesList(!isNewSpeciesList)
    }

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

    // Card UI: Control size's card
    const [isSize, setIsSize] = useState<boolean>()
    const [size, setSize] = useState<sizesType>("x1")
    const sizes = useRef<sizesType[]>([
        "x0.5",
        "x0.75",
        "x1",
    ])

    const changeSize = (sz: sizesType) => {
        setSize(sz)
        setIsSize(!isSize)
    }

    return (
        <div className="h-full w-full px-mainTwoSidePadding overflow-auto">
            <>
                <div className="w-full flex-col">
                    <span className="flex items-center justify-between">
                        <h2 className="">Khám phá mới</h2>
                        <button className="text-csSmall text-mainDarkBlue font-medium flex items-center underline" onClick={toggleNewSpeciesList}>
                            Xem tất cả

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 stroke-mainDarkBlue">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>

                    <span className="w-full flex justify-evenly gap-2.5 overflow-auto p-0.5">
                        {Array(10).fill(0).map((_, index) => {
                            return <Discover_NewCard key={index} speciesDeatail={toggleSpeciesDetail} />
                        })}
                    </span>
                </div>

                <div className="w-full h-full flex flex-col">
                    <span className="sticky top-0 left-0 flex flex-col bg-white pb-2.5">
                        <span className="w-full">
                            <h2 className="">Dữ liệu sinh vật biển</h2>
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

                            <span className="relative h-fit w-fit">
                                <button className="mainShadow !p-2.5 !rounded-small" onClick={() => { setIsSize(!isSize) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                    </svg>
                                </button>

                                {isSize && (
                                    <span className="mainShadow absolute top-full right-0 bg-white h-fit w-fit flex flex-col py-2.5 gap-2.5 rounded-small rounded-tr-none">
                                        {sizes.current.map((sz, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className={`flex items-center-safe gap-1.5 py-1.5 px-3.5 ${size === sz && "bg-mainLightBlueRGB"}`}
                                                    onClick={() => { changeSize(sz) }}
                                                >
                                                    <p className="text-csNormal">{sz}</p>
                                                </span>
                                            )
                                        })}
                                    </span>
                                )}
                            </span>
                        </span>
                    </span>

                    <span className="w-full flex-1 overflow-auto flex flex-wrap justify-between gap-2.5 px-0.5 py-2.5">
                        {Array(20).fill(0).map((_, index) => {
                            return <Discover_Card key={index} speciesDeatail={toggleSpeciesDetail} size={size} />
                        })}
                    </span>
                </div>
            </>

            {isNewSpeciesList && (<NewSpeciesList closeNewSpeciesList={toggleNewSpeciesList} />)}

            {isFunnel && (<Funnel closeFunnel={toggleFunnel} />)}
            {isSpeciesDetail && (<SpeciesDetail closeSpeciesDeatail={toggleSpeciesDetail} isShowLocation={false} />)}
        </div>
    )
}

export default Discover