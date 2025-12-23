import { toast } from "react-toastify";
import api from "../config/gateway";
import { toastConfig } from "../config/toastConfig";
import { addAnswerToQuestionDetail, answer, removeAnswerFromQuestionDetail } from "../redux/state/questionReducer";
import { store } from "../redux/store";

export class AnswerService {
    // Create answer
    static async createAnswer(
        userId: string,
        questId: string,
        name: string,
        email: string,
        role: string,
        body: string
    ) {
        if (!userId || !questId || !body) {
            toastConfig({
                toastType: "error",
                toastMessage: !userId ? "Không thể trả lời" : "Vui lòng điền đầy đủ thông tin"
            })

            return false
        }

        let pending = toastConfig({
            pending: true,
            toastMessage: "Đang thêm câu trả lời"
        })

        try {
            const { data, status } = await api.post("/user/answer/create", {
                userId,
                questId,
                body
            })

            if (status === 200 || status === 201) {
                const newAnswer = {
                    ...data,
                    creator: {
                        name,
                        email,
                        role
                    }
                } as answer
                store.dispatch(addAnswerToQuestionDetail(newAnswer))
                return true
            }

            toastConfig({
                toastType: "error",
                toastMessage: "Không thể thêm câu trả lời"
            })

            return false
        } catch (error) {
            console.error(error)
            toastConfig({
                toastType: "error",
                toastMessage: "Không thể thêm câu trả lời"
            })

            return false
        } finally {
            toast.dismiss(pending)
        }
    }

    // Delete answer
    static async deleteAnswer(userId: string, answerId: string) {
        if (!userId || !answerId) {
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu trả lời"
            })

            return false
        }

        let pending = toastConfig({
            pending: true,
            toastMessage: "Đang thu hồi câu trả lời"
        })

        try {
            const { data, status } = await api.delete(`/user/answer/${userId}/${answerId}/delete`)

            if (status === 200 || status === 201) {
                toastConfig({
                    toastType: "success",
                    toastMessage: "Đã xóa câu trả lời"
                })

                store.dispatch(removeAnswerFromQuestionDetail(answerId))

                return true
            }

            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu trả lời"
            })

            return false
        } catch (error) {
            console.error(error)
            toastConfig({
                toastType: "error",
                toastMessage: "Không tìm thấy câu trả lời"
            })

            return false
        } finally {
            toast.dismiss(pending)
        }
    }
}