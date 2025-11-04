import React from "react"

import NotFound from '../../assets/svg/NotFound.svg'

const Error404: React.FC = () => {
    return (
        <div className="absolute z-[999999] top-0 left-0 h-full w-full bg-white flex justify-center-safe items-center-safe">
            <div className="h-fit w-fit flex flex-col items-center-safe">
                <img src={NotFound} className="h-[150px]" />
                <h1 className="text-4xl! text-mainRed">404</h1>
                <p className="text-csBig">Không tìm thấy dữ liệu</p>
            </div>
        </div>
    )
}

export default Error404
