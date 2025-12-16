import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { AuthService, isTokenValid } from "../services/authService";
import { routeConfig } from "../config/routeConfig";
import { toastConfig } from "../config/toastConfig";
import { toast } from "react-toastify";

const Auth = () => {
    const router = useIonRouter();
    const pathname = router.routeInfo.pathname
    const mainPath = pathname.startsWith('/main');
    const loginPath = pathname.startsWith('/login');
    const registerPath = pathname.startsWith('/register');

    useEffect(() => {
        (async () => {
            const protectedRoute =
                pathname === routeConfig.main.camera ||
                pathname === routeConfig.main.quest ||
                pathname === routeConfig.main.moreInfo;

            if (!protectedRoute) return;

            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const expiresAt = localStorage.getItem("expires_at");

            let auth = false;
            let pending = toastConfig({
                toastMessage: "Đang xác thực người dùng",
                pending: true
            })

            if (accessToken && refreshToken && expiresAt && isTokenValid(parseInt(expiresAt))) {
                auth = await AuthService.auth();
            }

            if (!auth) {
                if (
                    mainPath &&
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
    }, [pathname]);


    return null
}

export default Auth