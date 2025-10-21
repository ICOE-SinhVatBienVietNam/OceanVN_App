import React, { useState } from "react";
import { motion } from "framer-motion";

interface Funnel_interface {
    closeFunnel: () => void
}

const Funnel: React.FC<Funnel_interface> = ({ closeFunnel }) => {
    const [filters, setFilters] = useState<Array<{ id: string; label: string; checked: boolean }>>(
        Array(20).fill(0).map((_, i) => ({
            id: `filter-${i}`,
            label: `Loài ${i + 1}`,
            checked: false,
        }))
    );

    const handleChange = (id: string) => {
        setFilters(prevFilters =>
            prevFilters.map(filter =>
                filter.id === id ? { ...filter, checked: !filter.checked } : filter
            )
        );
    };

    const handleReset = () => {
        console.log("hehe")
        setFilters(prevFilters =>
            prevFilters.map(filter => ({
                ...filter,
                checked: false
            }))
        );
    }

    const handleApplyClick = () => {
        const selectedFilters = filters.filter(filter => filter.checked).map(filter => filter.id);
        console.log("Selected filters:", selectedFilters);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 z-20 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-end-safe">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative h-full w-3/4 bg-white flex flex-col py-2.5">
                <button
                    onClick={closeFunnel}
                    className="absolute top-1/2 right-full translate-y-[-50%] h-[100px] text-white bg-mainRed flex justify-center-safe items-center-safe !px-2.5 !rounded-tl-full !rounded-bl-full"
                >
                    x
                </button>

                <div className="px-mainTwoSidePadding mb-2.5">
                    <h2 className="">Bộ lọc</h2>
                    <p className="text-csNormal text-mainRed font-medium">Số lượng: 10 loài</p>
                </div>

                <div className="flex-1 h-0 flex flex-col gap-2.5 py-2.5 px-mainTwoSidePadding overflow-auto">
                    {filters.map(filter => (
                        <span
                            key={filter.id}
                            onClick={() => handleChange(filter.id)}
                            className={`flex w-full !border-[0.5px] border-lightGray ${filter.checked && "bg-mainLightBlue"} rounded-small px-2.5 py-2`}
                        >
                            <p className={`text-csNormal font-medium ${filter.checked && "text-white"}`}>{filter.label}</p>
                        </span>
                    ))}
                </div>

                <div className="px-mainTwoSidePadding flex items-center-safe gap-2.5">
                    <button
                        className={`flex-1 text-csNormal font-medium !border-[0.5px] !border-lightGray !py-2.5 ${filters.filter(f => f.checked).length === 0 && "opacity-50"}`}
                        onClick={handleReset}
                        disabled={filters.filter(f => f.checked).length === 0}
                    >
                        Đặt lại
                    </button>

                    <button
                        className="flex-1 text-csNormal text-white font-medium bg-mainLightBlue !py-2.5"
                        onClick={handleApplyClick}
                    >
                        Áp dụng {filters.filter(f => f.checked).length > 0 && `(${filters.filter(f => f.checked).length})`}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Funnel;