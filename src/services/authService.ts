import { toast } from "react-toastify";
import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";

export class AuthService {
    // Sign in
    async signin(email: string, password: string) {
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

        try {
            const { status } = await api.post("/auth/sign-in", { email, password })

            if (status === 201) {
                toastConfig({
                    toastType: 'success',
                    toastMessage: 'Đăng nhập thành công'
                })
                return true
            }

            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })

            return false
        } catch (error) {
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
            console.log(status)
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
            console.error(error)
            toastConfig({
                toastType: 'error',
                toastMessage: 'Tài khoản không hợp lệ'
            })
            
            return false
        }
    }

    // Sign out

    // Require reset password

    // Reset password
}