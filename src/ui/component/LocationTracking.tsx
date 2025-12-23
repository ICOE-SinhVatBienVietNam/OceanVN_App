import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastConfig } from '../../config/toastConfig';
import { Capacitor } from '@capacitor/core';
import { setPosition } from '../../redux/state/authReducer';
import { RootState } from '../../redux/store';
import HarversineFormula from '../../modules/HarversineFormula';

const LocationTracker: React.FC = () => {
    const dispatch = useDispatch();
    const watchIdRef = useRef<number | null>(null);
    const isFirstTimeRef = useRef<boolean>(true);
    const recentPosition = useSelector(
        (state: RootState) => state.auth.userPosition
    );

    const recentPositionRef = useRef<typeof recentPosition>(null);

    useEffect(() => {
        recentPositionRef.current = recentPosition;
    }, [recentPosition]);

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
                    if (recentPositionRef.current && HarversineFormula(recentPositionRef.current[0], recentPositionRef.current[1], latitude, longitude) >= 10) {
                        dispatch(setPosition({ lat: latitude, lng: longitude }));
                    }

                    if (!recentPositionRef.current) dispatch(setPosition({ lat: latitude, lng: longitude }));
                },
                (error) => {
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
    }, []);

    return null; // This component doesn't render anything
};

export default LocationTracker;
