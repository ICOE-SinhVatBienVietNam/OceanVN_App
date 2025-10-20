// Import libraries
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DESKTOP_BREAKPOINT = 640;

export const useScreenSizeCheck = (): boolean => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width > DESKTOP_BREAKPOINT;
};


export const ScreenSizeWarningPopup: React.FC = () => {
    const isMobile = useScreenSizeCheck();

    return (
        <AnimatePresence>
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-mainRed capitalize">thiết bị không phù hợp</h2>
                        <p className="text-gray-600">
                            Vui lòng truy cập bằng thiết bị di động
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
