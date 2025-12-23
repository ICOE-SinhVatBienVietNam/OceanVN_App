import { toast } from "react-toastify";
import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { addOnePersonalQuestion, addPersonalQuestion, addPublicQuestion, paginationInfo, questionDetail, questionPagination, removePersonalQuestion, setQuestionDetail, updatePersonalPagination, updatePublicPagination } from "../redux/state/questionReducer";
import { store } from "../redux/store";

export class QuestionService {
    // Upload image
    public static async uploadImage(file: File) {
        try {
            const formData = new FormData()

            formData.append('images', file)
            formData.append('folderName', 'question')
            const { data, status } = await api.post("/user/img", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (status === 201) {
                return data.publicIds[0] as string
            }

            return false

        } catch (error) {
            toastConfig({
                toastType: 'error',
                toastMessage: 'Không thể tải ảnh lên'
            })
            console.error(error)
            return false
        }
    }

    // Delete image
    public static async deleteImage(ids: string[]) {
        if (ids.length === 0) return false

        try {
            const { } = await api.delete("/image/delete", {
                data: ids
            })

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    // Get question (pagination)
    static async questionPagination(
        page: number,
        limit: number,
        userId?: string,
        search?: string,
        sort_by?: "DESC" | "ASC",
        is_public?: boolean,
        signal?: AbortSignal
    ) {
        if (!page || !limit) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy dữ liệu"
            })

            console.error("Invalid data")

            return false
        }

        let pending = toastConfig({
            pending: true,
            toastMessage: search ? "Đang tìm kiếm" : "Đang tải dữ liệu"
        })

        try {
            const { data, status } = await api.get("/user/question/pagination", {
                params: {
                    userId,
                    page,
                    limit,
                    is_public,
                    search,
                    sort_by
                },
                signal
            })

            if (status === 200 || status === 201) {
                const paginationData = data as {
                    data: questionPagination[],
                    pagination: paginationInfo
                }
                if (is_public) {
                    store.dispatch(addPublicQuestion(paginationData.data))
                    store.dispatch(updatePublicPagination(paginationData.pagination))
                } else {
                    store.dispatch(addPersonalQuestion(paginationData.data))
                    store.dispatch(updatePersonalPagination(paginationData.pagination))
                }

                return true
            }

            return false
        } catch (error) {
            if (signal?.aborted) return false
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy dữ liệu"
            })

            console.error(error)

            return false
        } finally {
            toast.dismiss(pending)
        }
    }

    // Get question base on id
    static async getQuestion(questionId: string, signal?: AbortSignal) {
        if (!questionId) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu hỏi"
            })

            console.error("Invalid question's id")
            return false
        }

        let pending = toastConfig({
            pending: true,
            toastMessage: "Đang tìm câu hỏi"
        })

        try {
            const { data, status } = await api.get(`/user/question/${questionId}`, { signal })

            if (status === 200 || status === 201) {
                const questionDetail = data as questionDetail
                store.dispatch(setQuestionDetail(questionDetail))
                return true
            }

            return false
        } catch (error) {
            if (signal?.aborted) return false
            console.error(error)
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu hỏi"
            })

            return false
        } finally {
            toast.dismiss(pending)
        }
    }

    // Create question
    static async createQuestion(
        userId?: string,
        title?: string,
        body?: string,
        thumbnail?: string,
        latitude?: number,
        longtitude?: number,
        is_public: boolean = false
    ) {
        if (!userId || !title || !body) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không thể tạo câu hỏi"
            })

            if (thumbnail) await this.deleteImage([thumbnail])

            return false
        }

        try {
            const { data, status } = await api.post("/user/question/create", {
                userId,
                title,
                body,
                thumbnail,
                latitude,
                longtitude,
                is_public
            })

            if (status === 200 || status === 201) {
                const newQuestion = data as questionPagination
                store.dispatch(addOnePersonalQuestion(newQuestion))

                toastConfig({
                    toastType: "success",
                    toastMessage: "Đã gửi câu hỏi"
                })

                return data as questionPagination
            }

            toastConfig({
                toastType: "error",
                toastMessage: 'Không thể gửi câu hỏi'
            })

            if (thumbnail) await this.deleteImage([thumbnail])

            console.error(status)

            return false
        } catch (error) {
            toastConfig({
                toastType: "error",
                toastMessage: 'Không thể gửi câu hỏi'
            })
            if (thumbnail) await this.deleteImage([thumbnail])

            console.error(error)

            return false
        }
    }

    // Delete question
    static async deleteQuestion(
        userId: string, questionIds: string[]
    ) {
        if (!userId || !questionIds) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu hỏi"
            })

            return false
        }

        try {
            let deleted = 0
            let errorDelete = 0

            for (let i = 0; i < questionIds.length; i++) {
                const { status } = await api.delete(`/user/question/${userId}/${questionIds[i]}/delete`)

                if (status === 200 || status === 201) {
                    deleted++
                    store.dispatch(removePersonalQuestion(questionIds[i]))
                } else {
                    errorDelete++
                }
            }

            if (errorDelete === questionIds.length) {
                toastConfig({
                    toastType: "error",
                    toastMessage: "Không thể xóa các mục đã chọn"
                })
                return false
            } else {
                toastConfig({
                    toastType: "success",
                    toastMessage: `Đã xóa ${deleted} mục`
                })

                if (errorDelete > 0) {
                    toastConfig({
                        toastType: "warn",
                        toastMessage: `${errorDelete} mục chưa xóa`
                    })
                }

                return true
            }

            return true
        } catch (error) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không thể xóa câu hỏi"
            })

            console.error(error)
            return false
        }
    }

}