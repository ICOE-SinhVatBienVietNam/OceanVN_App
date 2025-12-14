import { useIonRouter } from "@ionic/react";
import { useEffect } from "react";
import { AuthService } from "../services/authService";
import { routeConfig } from "../config/routeConfig";
import { toastConfig } from "../config/toastConfig";

const Auth = () => {
    const router = useIonRouter();
    const pathname = router.routeInfo.pathname
    const mainPath = pathname.startsWith('/main');
    const loginPath = pathname.startsWith('/login');
    const registerPath = pathname.startsWith('/register');

    useEffect(() => {
        (async () => {
            const auth = await AuthService.auth()

            if (!auth) {
                if (mainPath && (pathname === routeConfig.main.camera || pathname === routeConfig.main.quest)) {
                    if (localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
                        toastConfig({
                            toastType: 'error',
                            toastMessage: "Phiên đăng nhập hết hạn"
                        })
                    } else {
                        toastConfig({
                            toastType: 'info',
                            toastMessage: "Vui lòng đăng nhập tài khoản"
                        })
                    }
                }
            } else {
                if (loginPath || registerPath) {
                    router.push(routeConfig.main.map)
                }
            }
        })()
    }, [pathname])

    return null
}

export default Auth