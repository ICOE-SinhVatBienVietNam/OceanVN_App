// Import libraries
import React, { JSX } from 'react';
import { CameraSource } from '@capacitor/camera';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoActionModalProps {
    onClose: () => void;
    onSelect: (source: CameraSource) => void;
}

const PhotoActionModal: React.FC<PhotoActionModalProps> = ({ onClose, onSelect }) => {
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
        exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
    };

    const OptionButton: React.FC<{ onClick: () => void, icon: JSX.Element, label: string }> = ({ onClick, icon, label }) => (
        <button onClick={onClick} className="mainShadow flex flex-col items-center justify-center gap-3 p-5 rounded-main! bg-white w-full aspect-square">
            {icon}
            <span className="text-csNormal font-medium text-mainDark">{label}</span>
        </button>
    );

    return (
        <AnimatePresence>
            <motion.div
                className="absolute inset-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center z-50 p-mainTwoSidePadding"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="w-[90%] bg-white flex flex-col gap-5 p-3.5 rounded-main"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className='w-full flex items-center-safe gap-2.5 py-1.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>

                        <h4 className='leading-none! m-0!'>Hình ảnh</h4>
                    </div>
                    <div className="w-full flex justify-center items-center gap-5">
                        <OptionButton
                            onClick={() => onSelect(CameraSource.Camera)}
                            label="Chụp ảnh"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-mainBlue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                            }
                        />
                        <OptionButton
                            onClick={() => onSelect(CameraSource.Photos)}
                            label="Chọn ảnh"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-mainBlue">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            }
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full text-center text-mainRed bg-mainRedRGB text-csMedium font-medium py-2.5! rounded-main!"
                    >
                        Hủy
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PhotoActionModal;
