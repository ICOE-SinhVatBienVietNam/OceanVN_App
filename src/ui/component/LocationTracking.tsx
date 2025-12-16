import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toastConfig } from '../../config/toastConfig';
import { Capacitor } from '@capacitor/core';
import { setPosition } from '../../redux/state/authReducer';

const LocationTracker: React.FC = () => {
    const dispatch = useDispatch();
    const watchIdRef = useRef<number | null>(null);
    const isFirstTimeRef = useRef<boolean>(true);

    const startTracking = () => {
        if (Capacitor.getPlatform() === "web" && isFirstTimeRef.current) {
            toastConfig({
                toastMessage:
                    "Lưu ý: Độ chính xác vị trí của bạn trên web có thể bị ảnh hưởng. Toạ độ các sự cố không thay đổi.",
                toastType: "info",
            });
            isFirstTimeRef.current = false;
        }

        if (navigator.geolocation) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setPosition({ lat: latitude, lng: longitude }));
                },
                (error) => {
                    console.error("Error getting location:", error);
                    toastConfig({
                        toastMessage: "Không thể lấy vị trí của bạn",
                        toastType: "error",
                    });
                    // Optionally clear position if error occurs
                    dispatch(setPosition(null));
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            toastConfig({
                toastMessage: "Trình duyệt không hỗ trợ định vị",
                toastType: "error",
            });
        }
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        dispatch(setPosition(null));
    };

    useEffect(() => {
        startTracking();

        return () => {
            stopTracking();
        };
    }, []); // Run once on mount, cleanup on unmount

    return null; // This component doesn't render anything
};

export default LocationTracker;
