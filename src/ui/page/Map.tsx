// Import librarise
import React, { useEffect, useRef, useState } from "react"

// Leaflet
import { MapContainer, TileLayer, useMap } from "react-leaflet"

// Component
import SpeciesList from "../component/SpeciesList"
import SpeciesDetail from "../component/SpeciesDetail"
import SpeciesLocationList from "../component/SpeciesLocationList"
import { useParams } from "react-router"
import { IonPage } from "@ionic/react"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { setSpecies } from "../../redux/state/speciesReducer"

// Serices
import { SpeciesService } from "../../services/speciesService"

const speciesService = new SpeciesService()

// 
const ZoomButton: React.FC = () => {
    const map = useMap()

    return (
        <span className="flex flex-col gap-2.5">
            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-3.5" onClick={() => { map.zoomIn() }}>
                <i className="fas fa-plus"></i>
            </button>

            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-3.5" onClick={() => { map.zoomOut() }}>
                <i className="fas fa-minus"></i>
            </button>
        </span>
    )
}

const MapResizeHandler: React.FC = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
};

const Map: React.FC = () => {
    // Data
    const speciesData = useSelector((state: RootState) => state.species)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const getSpeciesData = await speciesService.getSpeciesShortDetail()
            console.log(getSpeciesData)
            dispatch(setSpecies(getSpeciesData))
        })()
    }, [])

    // Layer
    const [layer, setLayer] = useState<number>(0)

    const mapLayers = useRef<Array<{ layer: string, attribution: string }>>([
        { layer: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", attribution: "&copy; OpenStreetMap contributors &copy; CARTO" },
        { layer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "&copy; OpenStreetMap contributors" }
    ])

    const changeLayer = () => {
        if (layer === mapLayers.current.length - 1) {
            setLayer(0)
        } else {
            setLayer(layer + 1)
        }
    }

    // SpeciesDetail
    const [isSpeciesDetail, setIsSpeciesDeatail] = useState<boolean>(false)

    const toggleSpeciesDetail = () => {
        setIsSpeciesDeatail(!isSpeciesDetail)
    }

    // SpeciesLocation
    const [isSpeciesLocation, setIsSpeciesLocation] = useState<boolean>(false)

    const toggleSpeciesLocation = () => {
        if (!isSpeciesLocation) {
            setIsSpeciesDeatail(false)
            setIsDiscover(false)
        }
        setIsSpeciesLocation(!isSpeciesLocation)
    }

    const backToSpeciesList = () => {
        setIsDiscover(true)
        setIsSpeciesLocation(false)
    }

    // Discover
    const [isDiscover, setIsDiscover] = useState<boolean>(false)

    const toggleDiscover = () => {
        setIsDiscover(!isDiscover)
    }

    // Get slug
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) {
            setIsSpeciesLocation(true)
        }
        // window.location.pathname = "/main/map"
    }, [])

    return (
        <IonPage>
            <div className="relative !z-0 h-full w-full">
                <MapContainer
                    center={[10.8231, 106.6297]}
                    zoom={12}
                    style={{ height: "100%", width: "100%", position: "relative" }}
                    className="z-0"
                    // ref={mapRef}
                    zoomControl={false}
                >
                    <MapResizeHandler />
                    <TileLayer
                        url={mapLayers.current[layer].layer}
                        attribution={mapLayers.current[layer].attribution}
                    />

                    {/* Option */}
                    <span className="absolute z-[1000] bottom-10 right-2.5 flex flex-col gap-7.5">
                        <ZoomButton />
                        <span className="flex flex-col gap-2.5">
                            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-3.5">
                                <i className="fas fa-fish"></i>
                            </button>
                        </span>

                        <span className="flex flex-col gap-2.5">
                            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-3.5" onClick={changeLayer}>
                                <i className="fas fa-layer-group"></i>
                            </button>

                            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-3.5">
                                <i className="fas fa-crosshairs"></i>
                            </button>
                        </span>
                    </span>
                </MapContainer>


                <span className="absolute bottom-2.5 left-1/2 translate-x-[-50%]">
                    {!isDiscover && !isSpeciesLocation && (

                        <button
                            onClick={toggleDiscover}
                            className="bottom-10 text-csNormal text-white flex items-center-safe gap-2.5 bg-mainLightBlue !py-2.5 !px-2.5 !rounded-small"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            Khám phá sinh vật biển
                        </button>
                    )}
                </span>

                {/* Popup */}
                {isDiscover && (<SpeciesList closeSpeciesList={toggleDiscover} speciesDeatail={toggleSpeciesDetail} />)}
                {isSpeciesLocation && (<SpeciesLocationList speciesDeatail={toggleSpeciesDetail} closeSpeciesLocationList={toggleSpeciesLocation} backToSpeciesList={backToSpeciesList} />)}
                {isSpeciesDetail && (<SpeciesDetail isShowLocation={isSpeciesLocation} closeSpeciesDeatail={toggleSpeciesDetail} speciesLocation={toggleSpeciesLocation} />)}
            </div>
        </IonPage>
    )
}

export default Map