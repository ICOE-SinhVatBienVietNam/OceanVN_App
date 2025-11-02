import React, { useState } from "react"
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"

interface SnapMap_interface {
    getPosition: () => void
}

const SnapMap: React.FC<SnapMap_interface> = ({ getPosition }) => {
    const initialCenter = { lat: 10.8231, lng: 106.6297 };
    const [center, setCenter] = useState(initialCenter);

    function MapMoveEvents() {
        const map = useMapEvents({
            move() {
                setCenter(map.getCenter());
            },
        });
        return null;
    }

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-white flex flex-col px-mainTwoSidePadding py-2.5">
            <div className="flex-1 h-0 w-full">
                <MapContainer
                    center={[10.8231, 106.6297]}
                    zoom={12}
                    style={{ height: "100%", width: "100%", position: "relative" }}
                    className="z-0"
                    // ref={mapRef}
                    zoomControl={false}
                >
                    <MapMoveEvents />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    <span className="absolute z-[1000] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-100%] !h-fit !w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 fill-mainRed stroke-mainDark">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </span>
                </MapContainer>
            </div>

            <div className="">
                <span className="w-full flex flex-col gap-2.5">
                    <button
                        onClick={getPosition}
                        className="w-full bg-mainRed !text-csBig text-white flex items-center-safe justify-center-safe gap-2 !py-2.5 !rounded-small"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 fill-white">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                        Lấy tọa độ
                    </button>

                    <span className="">
                        <p className="text-csBig font-medium">Hệ tọa độ: WGS84</p>
                        <span className="flex gap-5">
                            <p className="text-csNormal"><b>Kinh độ:</b> {center.lng.toFixed(6)}</p>
                            <p className="text-csNormal"><b>Vĩ độ:</b> {center.lat.toFixed(6)}</p>
                        </span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default SnapMap