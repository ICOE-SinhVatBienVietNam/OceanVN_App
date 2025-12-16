import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { AuthService, isTokenValid } from "../services/authService";
import { routeConfig } from "../config/routeConfig";
import { toastConfig } from "../config/toastConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Auth = () => {
    const router = useIonRouter();
    const pathname = router.routeInfo.pathname;
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            const protectedRoute =
                pathname === routeConfig.main.camera ||
                pathname === routeConfig.main.quest ||
                pathname === routeConfig.main.moreInfo;

            if (!protectedRoute || isAuth) {
                return;
            }

            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const expiresAt = localStorage.getItem("expires_at");

            let auth = false;
            let pending = toastConfig({
                toastMessage: "Đang xác thực người dùng",
                pending: true
            })

            if (accessToken && refreshToken && expiresAt && isTokenValid(parseInt(expiresAt))) {
                auth = await AuthService.auth(controller.signal);
            }

            if (!auth) {
                if (
                    (pathname === routeConfig.main.camera ||
                        pathname === routeConfig.main.quest)
                ) {
                    toastConfig({
                        toastType: "info",
                        toastMessage: "Vui lòng đăng nhập tài khoản"
                    });
                    localStorage.clear();
                }
            }

            toast.dismiss(pending)
        })();

        return () => {
            controller.abort();
        }
    }, [pathname, isAuth]);


    return null
}

export default Auth