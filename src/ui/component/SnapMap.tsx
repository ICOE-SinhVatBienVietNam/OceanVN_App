import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"

interface SnapMap_interface {
    getPosition: () => void
}

const SnapMap: React.FC<SnapMap_interface> = ({ getPosition }) => {
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
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    <span className="absolute z-[1000] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] !h-fit !w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                    </span>
                </MapContainer>
            </div>

            <div className="">
                <span className="w-full">
                    <button
                    onClick={getPosition}
                        className="w-full bg-mainDark !text-csNormal text-white !py-2.5 !rounded-small"
                    >
                        Lấy
                    </button>

                    <span className="">
                        <p className="text-csNormal">Hệ tọa độ: WGS84</p>
                        <p className="text-csNormal">Kinh độ: xxxxxxxxxxxxxx</p>
                        <p className="text-csNormal">Vĩ độ: xxxxxxxxxxxxxx</p>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default SnapMap