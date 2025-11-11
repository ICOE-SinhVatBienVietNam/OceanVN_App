import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

type FilterOption = {
    id: string;
    label: string;
};

export type FilterSection = {
    key: string;
    title: string;
    options: FilterOption[];
};

type Selections = Record<string, string[]>;

interface FunnelProps {
    closeFunnel: () => void;
    sections: FilterSection[];
    initialSelections: Selections;
    onApply: (selections: Selections) => void;
}

const Funnel: React.FC<FunnelProps> = ({ closeFunnel, sections, initialSelections, onApply }) => {
    const [currentSelections, setCurrentSelections] = useState<Selections>(initialSelections);
    const [isCloseFunnel, setIsCloseFunnel] = useState<boolean>(false);

    const toggleCloseFunnel = () => {
        setIsCloseFunnel(true);
        setTimeout(() => {
            closeFunnel();
        }, 200);
    };

    const handleChange = (sectionKey: string, optionId: string) => {
        setCurrentSelections(prev => {
            const currentSectionSelections = prev[sectionKey] || [];
            const isSelected = currentSectionSelections.includes(optionId);
            const newSectionSelections = isSelected
                ? currentSectionSelections.filter(id => id !== optionId)
                : [...currentSectionSelections, optionId];
            return {
                ...prev,
                [sectionKey]: newSectionSelections,
            };
        });
    };

    const handleReset = () => {
        setCurrentSelections({});
    };

    const handleApplyClick = () => {
        onApply(currentSelections);
        toggleCloseFunnel();
    };

    const totalSelectedCount = useMemo(() => {
        return Object.values(currentSelections).reduce((acc, ids) => acc + ids.length, 0);
    }, [currentSelections]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 z-20 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-end-safe">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative h-full w-3/4 bg-white flex flex-col gap-2.5 py-2.5">
                <button
                    onClick={toggleCloseFunnel}
                    className="absolute top-1/2 right-full translate-y-[-50%] h-[100px] text-white bg-mainRed flex justify-center-safe items-center-safe !px-2.5 !rounded-tl-full !rounded-bl-full"
                >
                    x
                </button>

                <div className="px-mainTwoSidePadding flex items-center-safe gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                    </svg>

                    <h3 className="">Bộ lọc</h3>
                </div>

                <div className="flex-1 h-0 flex flex-col gap-2 overflow-auto">
                    {sections.map(section => (
                        <div key={section.key} className="flex flex-col gap-2.5">
                            <h5 className="px-mainTwoSidePadding text-csNormal">{section.title}</h5>
                            <div className="flex flex-col gap-2.5 px-mainTwoSidePadding">
                                {section.options.map(option => {
                                    const isSelected = currentSelections[section.key]?.includes(option.id);
                                    return (
                                        <span
                                            key={option.id}
                                            onClick={() => handleChange(section.key, option.id)}
                                            className={`flex w-full !border-[0.5px] border-lightGray ${isSelected && "bg-mainLightBlue"} rounded-small px-2.5 py-2 cursor-pointer`}
                                        >
                                            <p className={`text-csNormal font-medium ${isSelected && "text-white"}`}>{option.label}</p>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-mainTwoSidePadding flex items-center-safe gap-2.5">
                    <button
                        className={`flex-1 text-csNormal font-medium !border-[0.5px] !border-lightGray !py-2.5 ${totalSelectedCount === 0 && "opacity-50"}`}
                        onClick={handleReset}
                        disabled={totalSelectedCount === 0}
                    >
                        Đặt lại
                    </button>

                    <button
                        className="flex-1 text-csNormal text-white font-medium bg-mainLightBlue !py-2.5"
                        onClick={handleApplyClick}
                    >
                        Áp dụng {totalSelectedCount > 0 && `(${totalSelectedCount})`}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Funnel;