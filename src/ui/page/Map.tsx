// Import librarise
import React, { useState } from "react"

// Leaflet
import { MapContainer, TileLayer, useMap } from "react-leaflet"

// Component
import SpeciesList from "../component/SpeciesList"
import SpeciesLocationList from "../component/SpeciesDetail"

// 
const ZoomButton: React.FC = () => {
    const map = useMap()
    return (
        <span className="flex flex-col gap-2.5">
            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-2.5" onClick={() => {map.zoomIn()}}>
                <i className="fas fa-plus"></i>
            </button>

            <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-2.5" onClick={() => {map.zoomOut()}}>
                <i className="fas fa-minus"></i>
            </button>
        </span>
    )
}

const Map: React.FC = () => {
    // SpeciesDetail
    const [isSpeciesDetail, setIsSpeciesDeatail] = useState<boolean>(false)
    const toggleSpeciesDetail = () => {
        setIsSpeciesDeatail(!isSpeciesDetail)
    }

    // Discover
    const [isDiscover, setIsDiscover] = useState<boolean>(false)

    const toggleDiscover = () => {
        setIsDiscover(!isDiscover)
    }

    return (
        <div className="relative !z-0 h-full w-full">
            <MapContainer
                center={[10.8231, 106.6297]}
                zoom={21}
                style={{ height: "100%", width: "100%", position: "relative" }}
                className="z-0"
                // ref={mapRef}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; OpenStreetMap contributors &copy; CARTO"
                />

                {/* Option */}
                <span className="absolute z-[1000] bottom-10 right-2.5 flex flex-col gap-7.5">
                    <ZoomButton />
                    <span className="flex flex-col gap-2.5">
                        <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-2.5">
                            <i className="fas fa-fish"></i>
                        </button>
                    </span>

                    <span className="flex flex-col gap-2.5">
                        <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-2.5">
                            <i className="fas fa-layer-group"></i>
                        </button>

                        <button className="mainShadow h-fit aspect-square bg-white !rounded-full !p-2.5">
                            <i className="fas fa-crosshairs"></i>
                        </button>
                    </span>
                </span>
            </MapContainer>


            <span className="absolute bottom-2.5 left-1/2 translate-x-[-50%]">
                {!isDiscover && (

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
            {isSpeciesDetail && (<SpeciesLocationList closeSpeciesDeatail={toggleSpeciesDetail} />)}
        </div>
    )
}

export default Map