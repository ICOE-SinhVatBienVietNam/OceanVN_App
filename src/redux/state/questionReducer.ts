import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Type
export type questionPagination = {
    id: string,
    creator_id: string,
    title: string,
    body: string,
    thumbnail: string,
    is_public: boolean,
    is_closed: boolean,
    closed_by: null | string,
    latitude: null | string,
    longtitude: null | string,
    created_at: string,
    update_at: string,
    createByUser: {
        name: string,
        email: string,
        role: string
    }
}

export type paginationInfo = {
    page: number,
    limit: number,
    total: number,
    totalPages: number
}

export type answer = {
    id: string,
    creator_id: string,
    quest_id: string,
    body: string,
    is_read: boolean
    created_at: string,
    creator: {
        name: string,
        email: string
        role: string
    }
}

export type questionDetail = {
    id: string,
    creator_id: string,
    title: string,
    body: string,
    thumbnail: string,
    is_public: boolean,
    is_closed: boolean,
    closed_by: null | string,
    latitude: null | string,
    longtitude: null | string,
    created_at: string,
    update_at: string,
    answer: answer[],
    answerCount: number
}

export interface QuestionState {
    publicData: questionPagination[]
    publicPagination: paginationInfo
    personalData: questionPagination[]
    personalPagination: paginationInfo
    questionDetailId: string,
    questionDetail: questionDetail
}

const initialState: QuestionState = {
    publicData: [],
    publicPagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1
    },
    personalData: [],
    personalPagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1
    },
    questionDetailId: "",
    questionDetail: {
        id: "",
        creator_id: "",
        title: "",
        body: "",
        thumbnail: "",
        is_public: false,
        is_closed: false,
        closed_by: null,
        latitude: null,
        longtitude: null,
        created_at: "",
        update_at: "",
        answer: [],
        answerCount: 0
    } as questionDetail
}

export const QuestionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        // Public
        addPublicQuestion(state, action: PayloadAction<questionPagination[]>) {
            const newItems = action.payload.filter(
                item => !state.publicData.some(existing => existing.id === item.id)
            )

            state.publicData.push(...newItems)
        },

        removePublicQuestionById(state, action: PayloadAction<string>) {
            state.publicData = state.publicData.filter(
                item => item.id !== action.payload
            )
        },

        updatePublicPagination(state, action: PayloadAction<Partial<paginationInfo>>) {
            const { page, limit, total, totalPages } = action.payload

            if (page !== undefined) {
                state.publicPagination.page = page
            }
            if (limit !== undefined) {
                state.publicPagination.limit = limit
            }
            if (total !== undefined) {
                state.publicPagination.total = total
            }
            if (totalPages !== undefined) {
                state.publicPagination.totalPages = totalPages
            }
        },

        resetPublicQuestions(state) {
            state.publicData = []
            state.publicPagination = {
                page: 1,
                limit: 20,
                total: 0,
                totalPages: 1
            }
        },

        // Personnal
        addPersonalQuestion(state, action: PayloadAction<questionPagination[]>) {
            const newItems = action.payload.filter(
                item => !state.personalData.some(existing => existing.id === item.id)
            )

            state.personalData.push(...newItems)
        },

        addOnePersonalQuestion(state, action: PayloadAction<questionPagination>) {
            const exists = state.personalData.some(
                item => item.id === action.payload.id
            )

            if (!exists) {
                state.personalData.unshift(action.payload)
                state.personalPagination.total += 1
            }
        },

        updatePersonalPagination(state, action: PayloadAction<Partial<paginationInfo>>) {
            const { page, limit, total, totalPages } = action.payload

            if (page !== undefined) {
                state.personalPagination.page = page
            }
            if (limit !== undefined) {
                state.personalPagination.limit = limit
            }
            if (total !== undefined) {
                state.personalPagination.total = total
            }
            if (totalPages !== undefined) {
                state.personalPagination.totalPages = totalPages
            }
        },

        removePersonalQuestion(state, action: PayloadAction<string>) {
            const id = action.payload

            const beforeLength = state.personalData.length
            state.personalData = state.personalData.filter(
                item => item.id !== id
            )

            if (state.personalData.length < beforeLength) {
                state.personalPagination.total = Math.max(
                    0,
                    state.personalPagination.total - 1
                )
            }

            state.publicData = state.publicData.filter(
                item => item.id !== id
            )
        },

        resetPersonalQuestions(state) {
            state.personalData = []
            state.personalPagination = {
                page: 1,
                limit: 20,
                total: 0,
                totalPages: 1
            }
        }
        ,

        // Question detail
        setQuestionDetailId(state, action: PayloadAction<string>) {
            state.questionDetailId = action.payload
        },

        setQuestionDetail(state, action: PayloadAction<questionDetail>) {
            state.questionDetail = action.payload
        },

        clearQuestionDetail(state) {
            state.questionDetail = {} as questionDetail
        },

        addAnswerToQuestionDetail(state, action: PayloadAction<answer>) {
            const exists = state.questionDetail.answer.some(
                a => a.id === action.payload.id
            )

            if (!exists) {
                state.questionDetail.answer.unshift(action.payload)
                state.questionDetail.answerCount += 1
            }
        },

        removeAnswerFromQuestionDetail(state, action: PayloadAction<string>) {
            const beforeLength = state.questionDetail.answer.length

            state.questionDetail.answer = state.questionDetail.answer.filter(
                a => a.id !== action.payload
            )

            if (state.questionDetail.answer.length < beforeLength) {
                state.questionDetail.answerCount = Math.max(
                    0,
                    state.questionDetail.answerCount - 1
                )
            }
        }

    },
})

export const {
    addPublicQuestion,
    removePublicQuestionById,
    updatePublicPagination,
    resetPublicQuestions,

    addPersonalQuestion,
    addOnePersonalQuestion,
    updatePersonalPagination,
    removePersonalQuestion,
    resetPersonalQuestions,

    setQuestionDetailId,
    setQuestionDetail,
    clearQuestionDetail,
    addAnswerToQuestionDetail,
    removeAnswerFromQuestionDetail
} = QuestionSlice.actions

export default QuestionSlice.reducer