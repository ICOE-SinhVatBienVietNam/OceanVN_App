import { toast } from "react-toastify";
import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { setAuth, setUserData, userData } from "../redux/state/authReducer";
import { store } from "../redux/store";

export class AuthService {
    // Authentication
    static async auth() {
        try {
            const { data, status } = await api.get("/auth/me")

            if (status === 200 || status === 201) {
                const userData = data as userData['user']
                store.dispatch(setUserData({ userData }))
                store.dispatch(setAuth({ auth: true }))

                return true
            }

            store.dispatch(setUserData({ userData: {} }))
            store.dispatch(setAuth({ auth: false }))
            
            return false
        } catch (error) {
            store.dispatch(setUserData({ userData: {} }))
            store.dispatch(setAuth({ auth: false }))
            return false
        }
    }

    // Sign in
    static async signin(email: string, password: string) {
        if (!email || !password) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng điền đầy đủ thông tin'
            })
            return false
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ'
            })
            return false
        }

        let pending

        try {
            pending = toastConfig({
                pending: true,
                toastMessage: "Đang đăng nhập"
            })
            const { data, status } = await api.post("/auth/sign-in", { email, password })
            toast.dismiss(pending)

            if (status === 201) {
                const userData = data as userData

                if (userData.user.banned) {
                    toastConfig({
                        toastType: 'error',
                        toastMessage: 'Tài khoản đã bị khóa'
                    })

                    setTimeout(() => {
                        toastConfig({
                            toastType: 'info',
                            toastMessage: 'Vui lòng liên hệ quản trị viên'
                        })
                    }, 1000)

                    return false
                } else {
                    toastConfig({
                        toastType: 'success',
                        toastMessage: 'Đăng nhập thành công'
                    })

                    localStorage.setItem("accessToken", userData.accessToken)
                    localStorage.setItem("refreshToken", userData.refreshToken)

                    store.dispatch(setUserData({ userData: userData.user }))
                    store.dispatch(setAuth({ auth: true }))
                    return true
                }
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })

            return false
        } catch (error) {
            toast.dismiss(pending)
            console.error(error)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })

            return false
        }
    }

    // Sign up
    static async signup(name: string, email: string, password: string, confirmPassword: string) {
        if (!name || !email || !password || !confirmPassword) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng điền đầy đủ thông tin'
            })
            return false
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ'
            })
            return false
        }

        if (password !== confirmPassword) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Mật khẩu không hợp lệ'
            })
            return false
        }

        let pending

        pending = toastConfig({
            pending: true,
            toastMessage: "Đang tạo tài khoản"
        })

        try {
            const { status } = await api.post("/auth/sign-up", {
                email, password, name
            })

            toast.dismiss(pending)
            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Tài khoản đã được tạo'
                })
                return true
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })

            return false
        } catch (error) {
            toast.dismiss(pending)
            console.error(error)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })

            return false
        }
    }

    // Sign out
    public static async signout() {
        try {
            const { } = await api.post("/auth/signout", {
                authorization: localStorage.getItem("accessToken")
            })
        }
        finally {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("lastSOSTimestamp")
        }
    }

    // Require reset password
    public static async requireResetPassword(email: string) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !regex.test(email)) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Vui lòng cung cấp email'
            })
            return false
        }

        let pending
        pending = toastConfig({
            pending: true,
            toastMessage: "Đang gửi yêu cầu"
        })

        try {
            const { status } = await api.post("/auth/require-reset-password", { email })
            toast.dismiss(pending)

            if (status === 200 || status === 201) {
                return true
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ'
            })

            return false

        } catch (error) {
            toast.dismiss(pending)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ'
            })

            console.error(error)
            return false
        }
    }

    // Reset password
    public static async resetPassword(refreshToken: string | null, accessToken: string | null, confirmPassword: string, newPassword: string) {
        if (!refreshToken || !accessToken || !confirmPassword || !newPassword || confirmPassword !== newPassword) {
            toastConfig({
                toastType: "error",
                toastMessage: "Mật khẩu không hợp lệ"
            })

            console.error("ResetToken can be invalid")

            return false
        }

        let pending
        pending = toastConfig({
            pending: true,
            toastMessage: "Đang gửi yêu cầu"
        })

        try {
            const { status } = await api.post("/auth/forgot-password", { accessToken, refreshToken, newPassword })
            toast.dismiss(pending)

            if (status === 200 || status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Mật khẩu đã được cập nhật'
                })

                return true
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Yêu cầu bị từ chối'
            })

            return false
        } catch (error) {
            toast.dismiss(pending)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Email không hợp lệ'
            })

            console.error(error)
            return false
        }
    }
}