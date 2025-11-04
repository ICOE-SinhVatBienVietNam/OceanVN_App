// Import librarise
import React, { useEffect, useRef, useState } from "react"
import uniqolor from "uniqolor"

// Leaflet
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import L from 'leaflet'

// Component
import SpeciesList from "../component/SpeciesList"
import SpeciesDetail from "../component/SpeciesDetail"
import SpeciesLocationList from "../component/SpeciesLocationList"
import { useParams } from "react-router"
import { IonPage } from "@ionic/react"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import { setSpecies, setSpeciesDiscovered } from "../../redux/state/speciesReducer"

// Serices
import { SpeciesService, SpeciesShortDetail } from "../../services/speciesService"

// Toast
import { toastConfig } from "../../config/toastConfig"
import { toast } from "react-toastify"

const speciesService = new SpeciesService()

// Zoom button
const ZoomButton: React.FC = () => {
    const map = useMap()
    const [zoomLevel, setZoomLevel] = useState<number>()

    useEffect(() => {
        setZoomLevel(map.getZoom())

        const onZoom = () => {
            setZoomLevel(map.getZoom())
        };

        map.on("zoomend", onZoom);
        return () => {
            map.off("zoomend", onZoom);
        };
    }, [map])

    return (
        <span className="flex flex-col gap-2.5">
            <button className="mainShadow h-fit aspect-square bg-white flex justify-center-safe items-center-safe !rounded-full !p-3.5" onClick={() => { map.zoomIn() }}>
                <i className="fas fa-plus"></i>
            </button>

            <div className="mainShadow h-fit aspect-square bg-mainLightBlue flex justify-center-safe items-center-safe !rounded-full !p-3.5">
                <p className="text-csNormal text-white font-medium">{zoomLevel}</p>
            </div>

            <button className="mainShadow h-fit aspect-square bg-white flex justify-center-safe items-center-safe !rounded-full !p-3.5" onClick={() => { map.zoomOut() }}>
                <i className="fas fa-minus"></i>
            </button>
        </span>
    )
}

// Custom icon
interface PinMarkerProps {
    position: [number, number];
    color: string;
    size?: number;
}
const PinMarker: React.FC<PinMarkerProps> = ({ position, color, size = 32 }) => {
    const icon = L.divIcon({
        className: "custom-pin-marker",
        html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="${size}" height="${size}">
        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
      </svg>
    `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });

    return <Marker position={position} icon={icon} />;
};


// Map resize
const MapResizeHandler: React.FC = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
};

// Map
const Map: React.FC = () => {
    // Map
    const mapRef = useRef<L.Map>(null)

    // Data
    const speciesData = useSelector((state: RootState) => state.species.speciesList)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const getSpeciesData = await speciesService.getSpeciesShortDetail()
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

    const handleDiscover = () => {
        if (speciesData.length <= 0) {
            toastConfig({
                toastMessage: "Không tìm thấy dữ liệu sinh vật",
                toastType: "info"
            })
        } else {
            const pendingToast = toastConfig({
                toastMessage: "Đang khám phá",
                pending: true
            })

            const mapView = mapRef.current?.getBounds()
            if (!mapView) {
                toastConfig({
                    toastMessage: "Bản đồ chưa được tải",
                    toastType: 'error'
                })
            } else {
                const speciesListDiscovered: SpeciesShortDetail[] = []
                speciesData.forEach((species) => {
                    if (species.species_coordinates.length > 0) {
                        species.species_coordinates.forEach((position) => {
                            if (mapView.contains([parseFloat(position.latitude), parseFloat(position.longitude)]) && !speciesListDiscovered.includes(species)) {
                                speciesListDiscovered.push(species)
                            }
                        })
                    }
                    mapView.contains
                })
                
                toast.dismiss(pendingToast)

                if (speciesListDiscovered.length > 0) {
                    toggleDiscover() 
                    dispatch(setSpeciesDiscovered(speciesListDiscovered))
                } else {
                    toastConfig({
                        toastMessage: 'Không tìm thấy sinh vật trong vùng bản đồ hiện tại',
                        toastType: 'error'
                    })
                }
            }
        }
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
                    zoom={5}
                    style={{ height: "100%", width: "100%", position: "relative" }}
                    className="z-0"
                    ref={mapRef}
                    zoomControl={false}
                >
                    <MapResizeHandler />
                    <TileLayer
                        url={mapLayers.current[layer].layer}
                        attribution={mapLayers.current[layer].attribution}
                    />

                    {speciesData.length > 0 && speciesData.map((species) => (
                        species.species_coordinates && species.species_coordinates.length > 0 && species.species_coordinates.map((data, index) => {
                            return <PinMarker key={species.id + index.toString()} color={uniqolor(species.id).color} position={[parseFloat(data.latitude), parseFloat(data.longitude)]} />
                        })
                    ))}

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
                            onClick={handleDiscover}
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