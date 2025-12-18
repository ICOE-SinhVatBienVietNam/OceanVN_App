// Import libraries
import React, { useEffect, useMemo, useRef, useState } from "react"
import { VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso"

// Component
import Funnel, { FilterSection } from "../component/Funnel"
import SpeciesDetail from "../component/SpeciesDetail"
import { IonPage } from "@ionic/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { SpeciesShortDetail } from "../../services/speciesService"
import { cloudinaryRoot, cloudinaryThumbnail, noImageURL } from "../../config/gateway"
import { setSpeciesDetailID } from "../../redux/state/speciesReducer"
import { threatenedSpecies } from "../../config/threatenedSpecies"

type Selections = Record<string, string[]>;

// Card
type sizesType = "x0.5" | "x0.75" | "x1"

interface Card_interface {
    speciesDeatail: () => void
    size?: sizesType
    speciesData: SpeciesShortDetail
}

export const Discover_Card: React.FC<Card_interface> = React.memo(({ speciesDeatail, size, speciesData }) => {
    const dispatch = useDispatch()
    const thumbnail = speciesData.thumbnails.find(th => th.is_main === true)?.thumbnail
    const threatenedLevel = threatenedSpecies.find(lv => lv.code === speciesData.threatened_symbol)?.level

    const chooseSpecies = () => {
        dispatch(setSpeciesDetailID(speciesData.id))
        speciesDeatail()
    }

    return (
        <span className={`mainShadow flex-shrink-0 h-full w-full  flex flex-col gap-2.5 rounded-main px-2.5 py-2.5`} onClick={chooseSpecies}>
            <span className={`w-full h-[50px] ${size == "x1" && "h-[100px]"} ${size == "x0.75" && "h-[100px]"} aspect-square overflow-hidden flex justify-center items-center rounded-main`}>
                <img src={cloudinaryThumbnail + thumbnail} className="w-full h-full object-cover object-center" loading="lazy" onError={(e) => { e.currentTarget.src = noImageURL }} />
            </span>

            {size === 'x1' && (
                <>
                    <span className="w-full flex-1 flex flex-col items-center-safe gap-2.5">
                        <p className="text-csNormal font-medium text-center line-clamp-2">
                            <i>{speciesData.species.split(" ").slice(0, 2).join(" ")} </i>
                            {speciesData.species.split(" ").slice(2).join(" ")}
                        </p>
                    </span>

                    <span className="flex items-center-safe gap-1.5">
                        <p className="h-fit flex items-center text-csSmall font-bold text-gray">{speciesData.threatened_symbol}</p>


                        <span className={`w-full flex ${"border border-lightGray"}`}>
                            {speciesData.threatened_symbol && threatenedLevel != null ? (
                                threatenedSpecies.map((level, index) => {
                                    return (
                                        <span key={index} className={`relative flex-1 h-2 ${(index <= parseInt(threatenedLevel)) && level.color}`}>

                                        </span>
                                    )
                                })

                            ) : null}
                        </span>
                    </span>
                </>
            )}
        </span>
    )
});

// Main component
const Discover: React.FC = () => {
    // SpeciesData
    const speciesData = useSelector((state: RootState) => state.species.speciesList)
    const [selections, setSelections] = useState<Selections>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filterTitle = useRef<Partial<Record<keyof SpeciesShortDetail, string>>>({
        group: "Nhóm",
        phylum: "Ngành",
        class: "Lớp",
        order: "Bộ",
        genus: "Giống",
        threatened_symbol: "Mức độ bảo tồn",
    });

    const filterSections = useMemo<FilterSection[]>(() => {
        const filterKeys: (keyof Pick<SpeciesShortDetail, 'group' | 'phylum' | 'genus' | 'threatened_symbol' | "class" | "order">)[] = [
            'group', 'threatened_symbol', 'phylum', "class", "order", 'genus'
        ];

        return filterKeys.reduce((acc, key) => {
            const uniqueValues = Array.from(new Set(speciesData.map(s => s[key]).filter((v): v is string => !!v)));

            if (uniqueValues.length > 1) {
                acc.push({
                    key: key,
                    title: `Lọc theo ${filterTitle.current[key]}`,
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

    // Virtuoso
    const virtuosoRef = useRef<VirtuosoGridHandle>(null)

    useEffect(() => {
        virtuosoRef.current?.scrollTo({ top: 0 })
    }, [size])


    return (
        <IonPage>
            <div className="h-full w-full px-mainTwoSidePadding overflow-auto">
                <div className="w-full h-full flex flex-col">
                    <span className="sticky top-0 left-0 z-10 flex flex-col bg-white pb-2.5">
                        <span className="w-full py-2.5">
                            <h2 className="leading-5!">Dữ liệu sinh vật biển</h2>
                            <p className="text-csSmall font-medium text-mainRed">Số lượng: {filteredSpecies.length} loài</p>

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
                                    <span className="mainShadow absolute z-5000 top-full right-0 bg-white h-fit w-fit flex flex-col py-2.5 gap-2.5 rounded-small rounded-tr-none">
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

                    <span className="w-full flex-1 overflow-auto px-0.5 py-2.5">
                        <VirtuosoGrid
                            ref={virtuosoRef}
                            style={{ height: '100%', width: '100%' }}
                            totalCount={filteredSpecies.length}
                            components={{
                                Item: ({ children, ...props }) => {
                                    let itemWidth = '100%'; // Default to full width
                                    switch (size) {
                                        case 'x0.5':
                                            itemWidth = 'calc(25% - 10.5px)';
                                            break;
                                        case 'x0.75':
                                            itemWidth = 'calc(33.333% - 10px)';
                                            break;
                                        case 'x1':
                                            itemWidth = 'calc(50% - 10px)';
                                            break;
                                    }
                                    return (
                                        <div
                                            {...props}
                                            style={{
                                                width: itemWidth,
                                                margin: '5px',
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            {children}
                                        </div>
                                    );
                                },
                                List: React.forwardRef(({ style, children, ...props }, ref) => (
                                    <div ref={ref} {...props} style={{ ...style, display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>{children}</div>
                                )),
                            }}
                            itemContent={(index) => (
                                <Discover_Card
                                    speciesData={filteredSpecies[index]}
                                    speciesDeatail={toggleSpeciesDetail}
                                    size={size}
                                />
                            )}
                        />
                    </span>
                </div>

                {/* {isNewSpeciesList && (<NewSpeciesList closeNewSpeciesList={toggleNewSpeciesList} />)} */}

                {isFunnel && (<Funnel closeFunnel={toggleFunnel} sections={filterSections} initialSelections={selections} onApply={setSelections} />)}
                {isSpeciesDetail && (<SpeciesDetail closeSpeciesDeatail={toggleSpeciesDetail} />)}
            </div>
        </IonPage>
    )
}

export default Discover