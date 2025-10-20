// Import librarise
import React from "react"

// Layout
import MainLayout from "../layout/MainLayout"

// Leaflet
import { MapContainer, TileLayer } from "react-leaflet"

const MapComponent: React.FC = () => {
    // Main position
    const mainPosition: [number, number] = [10.8231, 106.6297]
    return (
        <div className="h-full w-full">
            <MapContainer
                center={mainPosition}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
                // ref={mapRef}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; OpenStreetMap contributors &copy; CARTO"
                />


            </MapContainer>
        </div>
    )
}

// const Map: React.FC = () => {
//     return <MainLayout children={MapComponent} />
// }

export default MapComponent