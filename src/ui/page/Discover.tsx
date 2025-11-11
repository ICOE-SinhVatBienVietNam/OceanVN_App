// Import libraries
import React, { useEffect, useMemo, useRef, useState } from "react"

// Images
import Logo from "../../assets/SinhVatBienVN.png"

// Component
import Funnel, { FilterSection } from "../component/Funnel"
import NewSpeciesList from "../component/NewSpeciesList"
import SpeciesDetail from "../component/SpeciesDetail"
import { IonPage } from "@ionic/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { SpeciesShortDetail } from "../../services/speciesService"
import { cloudinaryRoot } from "../../config/gateway"
import { setSpeciesDetailID } from "../../redux/state/speciesReducer"

type Selections = Record<string, string[]>;

// Card
type sizesType = "x0.5" | "x0.75" | "x1"

interface Card_interface {
    speciesDeatail: () => void
    size?: sizesType
    speciesData: SpeciesShortDetail
}

export const Discover_NewCard: React.FC<Card_interface> = ({ speciesDeatail, speciesData }) => {
    return (
        <span className="mainShadow flex-shrink-0 !w-[130px] h-fit flex flex-col gap-2.5 rounded-main px-2.5 py-5" onClick={speciesDeatail}>
            <span className="w-full h-[60px] flex justify-center-safe items-center-safe">
                <img src={cloudinaryRoot + speciesData.thumbnails[0].thumbnail} className="!h-full" />
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

export const Discover_Card: React.FC<Card_interface> = ({ speciesDeatail, size, speciesData }) => {
    const dispatch = useDispatch()
    const thumbnail = speciesData.thumbnails.find(th => th.is_main === true)?.thumbnail
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
                    style: "basis-[calc(25%-8.5px)]", // 4 cards per row with gap-2.5 (10px) and px-0.5 (4px total)
                    info: true // Hide text
                }
                setTextSize(style)
                break;

            case 'x0.75':
                style = {
                    style: "basis-[calc(33.333%-8px)]", // 3 cards per row with gap-2.5 (10px) and px-0.5 (4px total)
                    info: true // Hide text
                }
                setTextSize(style)
                break;

            case 'x1':
                style = {
                    style: "basis-[calc(50%-7px)]", // 2 cards per row with gap-2.5 (10px) and px-0.5 (4px total)
                    info: false // Show text
                }
                setTextSize(style)
                break;
        }

    }, [size])

    const chooseSpecies = () => {
        dispatch(setSpeciesDetailID(speciesData.id))
        speciesDeatail()
    }


    return (
        <span className={`mainShadow flex-shrink-0 ${textSize?.style} flex flex-col gap-2.5 rounded-main px-2.5 py-5`} onClick={chooseSpecies}>
            <span className={`w-full h-full ${size == "x1" && "max-h-[80%]"} aspect-square overflow-hidden flex justify-center items-center rounded-main`}>
                <img src={cloudinaryRoot + thumbnail} className="w-full h-full object-cover object-center" />
            </span>

            {!textSize?.info && (
                <span className="w-full flex flex-col items-center-safe gap-2.5">
                    <p className="text-csNormal font-medium text-center">{speciesData.species}</p>
                </span>
            )}
        </span>
    )
}

// Main component
const Discover: React.FC = () => {
    // SpeciesData
    const speciesData = useSelector((state: RootState) => state.species.speciesList)
    const [selections, setSelections] = useState<Selections>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filterSections = useMemo<FilterSection[]>(() => {
        const filterKeys: (keyof Pick<SpeciesShortDetail, 'group' | 'phylum' | 'genus'>)[] = ['group', 'phylum', 'genus',];

        return filterKeys.reduce((acc, key) => {
            const uniqueValues = Array.from(new Set(speciesData.map(s => s[key]).filter((v): v is string => !!v)));

            if (uniqueValues.length > 1) {
                acc.push({
                    key: key,
                    title: `Lọc theo ${key.charAt(0).toUpperCase() + key.slice(1)}`,
                    options: uniqueValues.map(value => ({ id: value, label: value }))
                });
            }

            return acc;
        }, [] as FilterSection[]);
    }, [speciesData]);

    const filteredSpecies = useMemo(() => {
        const activeFilterKeys = Object.keys(selections).filter(key => selections[key]?.length > 0);

        let tempFilteredSpecies = speciesData;

        if (activeFilterKeys.length > 0) {
            tempFilteredSpecies = speciesData.filter(species => {
                return activeFilterKeys.every(key => {
                    const speciesPropertyKey = key as keyof SpeciesShortDetail;
                    const speciesValue = species[speciesPropertyKey];
                    return typeof speciesValue === 'string' && selections[key].includes(speciesValue);
                });
            });
        }

        if (searchTerm) {
            tempFilteredSpecies = tempFilteredSpecies.filter(species =>
                species.species.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return tempFilteredSpecies;
    }, [speciesData, selections, searchTerm]);


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
    const [size, setSize] = useState<sizesType>("x0.5")
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
        <IonPage>
            <div className="h-full w-full px-mainTwoSidePadding overflow-auto">
                <>
                    {/* <div className="w-full flex-col">
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
                    </div> */}

                    <div className="w-full h-full flex flex-col">
                        <span className="sticky top-0 left-0 flex flex-col bg-white pb-2.5">
                            <span className="w-full py-2.5">
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
                                        placeholder="Tìm kiếm theo tên..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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

                        <span className="w-full flex-1 overflow-auto flex flex-wrap content-start gap-x-2.5 gap-y-2.5 justify-start px-0.5 py-2.5">
                            {filteredSpecies.map((species) => {
                                return <Discover_Card key={species.id} speciesDeatail={toggleSpeciesDetail} speciesData={species} size={size} />
                            })}
                        </span>
                    </div>
                </>

                {isNewSpeciesList && (<NewSpeciesList closeNewSpeciesList={toggleNewSpeciesList} />)}

                {isFunnel && (<Funnel closeFunnel={toggleFunnel} sections={filterSections} initialSelections={selections} onApply={setSelections} />)}
                {isSpeciesDetail && (<SpeciesDetail closeSpeciesDeatail={toggleSpeciesDetail} />)}
            </div>
        </IonPage>
    )
}

export default Discover