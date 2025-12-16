import { toast } from "react-toastify";
import api from "../config/gateway";
import { routeConfig } from "../config/routeConfig";
import { toastConfig } from "../config/toastConfig";
import { addData, ContributionData, pushData, removeDataById, setLimit, setPage, setTotal, setTotalPage } from "../redux/state/contributionReducer";
import { store } from "../redux/store";
import { isTokenValid } from "./authService";

export function dismissAllOverlays() {
    document
        .querySelectorAll(
            'ion-alert, ion-modal, ion-toast, ion-loading, ion-popover, ion-action-sheet'
        )
        .forEach((el: any) => el.dismiss?.());
}

export class ContributionService {
    // Create contribution - isContribute = true => contribution, isContribute = true => users want to save their image
    static async createContribution(
        userId: string,
        imgURL: string,
        imageName?: string,
        imageDescription?: string,
        latitude?: number,
        longtitude?: number,
        isContribute: boolean = false
    ) {
        if (!imgURL) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không nhận được hình ảnh"
            })

            return false
        }

        if (!userId) {
            const expires = localStorage.getItem("expires_at")
            if (expires && isTokenValid(parseInt(expires))) {
                console.error("userId is invalid")
                toastConfig({
                    toastType: "error",
                    toastMessage: `Không thể ${isContribute ? "tạo đóng góp" : "lưu ảnh"}`
                })
            } else {
                toastConfig({
                    toastType: "error",
                    toastMessage: "Phiên đăng nhập hết hạn"
                })

                setTimeout(() => {
                    dismissAllOverlays()
                    window.location.replace(routeConfig.login.root)
                }, 1500)
            }

            return false
        }

        if (isContribute && (!latitude || !longtitude)) {
            console.error("Invalid coordinate")
            toastConfig({
                toastType: "error",
                toastMessage: `Không thể ${isContribute ? "tạo đóng góp" : "lưu ảnh"}`
            })

            return false
        }

        try {
            const { data, status } = await api.post("/user/contribution/create", {
                contributor_id: userId,
                title: imageName,
                body: imageDescription,
                latitude,
                longtitude,
                contributionpic: imgURL,
                is_contribute: isContribute
            })

            if (status === 200 || status === 201) {
                if (data?.id) {
                    store.dispatch(addData({ data }))
                }

                toastConfig({
                    toastType: "success",
                    toastMessage: `Đã ${isContribute ? "tạo đóng góp" : "lưu ảnh"}`
                })

                return true
            }

            toastConfig({
                toastType: "error",
                toastMessage: `Không thể ${isContribute ? "tạo đóng góp" : "lưu ảnh"}`
            })

            return false
        } catch (error: any) {
            console.error('Error in createContribution:', error.response?.data || error.message || error);
            toastConfig({
                toastType: "error",
                toastMessage: `Không thể ${isContribute ? "tạo đóng góp" : "lưu ảnh"}`
            })

            return false
        }
    }

    // Get contribution
    static async getContribution(
        userId: string,
        page: number,
        limit: number = 20,
        is_share: boolean = false,
        search?: string,
        sort_by: "DESC" | "ASC" = "DESC",
        signal?: AbortSignal
    ) {
        if (!userId || !page) {
            console.error("Invalid data")
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy dữ liệu"
            })
            return false
        }

        let pending = toastConfig({
            pending: true,
            toastMessage: "Đang tải dữ liệu"
        })

        try {
            const { data, status, statusText } = await api.get("/user/contribution/pagination", {
                params: {
                    userId,
                    page,
                    limit,
                    is_share,
                    search,
                    sort_by,
                },
                signal
            })

            if (status === 200 || status === 201) {
                console.log(data)
                store.dispatch(pushData({ data: data.data }))
                store.dispatch(setPage(data.pagination.page))
                store.dispatch(setTotalPage(data.pagination.totalPages))
                store.dispatch(setLimit(data.pagination.limit))
                store.dispatch(setTotal(data.pagination.total))
                toast.dismiss(pending)
                return true
            }

            toast.dismiss(pending)
            console.error(statusText)
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy dữ liệu"
            })

            return false
        } catch (error) {
            toast.dismiss(pending)
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy dữ liệu"
            })
            console.error(error)

            return false
        }
    }

    // Delete contribution
    static async deleteContribution(ids?: string[], userId?: string) {
        if (!ids || !userId) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không thể xóa"
            })

            console.error("Invalid data")

            return false
        }

        const pending = toastConfig({
            pending: true,
            toastMessage: "Đang xóa..."
        })

        try {
            let countDeleted = 0
            let countDeleteError = 0

            for (let i = 0; i < ids.length; i++) {
                const { status } = await api.delete(`/user/contribution/${userId}/${ids[i]}/delete`)

                if (status === 200 || status === 201) {
                    countDeleted++
                    store.dispatch(removeDataById({ id: ids[i] }))
                } else {
                    countDeleteError++
                }

            }

            if (countDeleteError === ids.length) {
                toastConfig({
                    toastType: "error",
                    toastMessage: "Xóa không thành công"
                })

                return false
            } else {
                toastConfig({
                    toastType: "success",
                    toastMessage: `Đã xóa ${countDeleted} mục`
                })
                if (countDeleteError > 0) {
                    toastConfig({
                        toastType: "warn",
                        toastMessage: `Không thể xóa ${countDeleteError} mục`
                    })
                }

                return true
            }
        } catch (error) {
            console.error(error)
            toastConfig({
                toastType: "error",
                toastMessage: "Không thể xóa"
            })

            return false
        } finally {
            toast.dismiss(pending)
        }
    }
}