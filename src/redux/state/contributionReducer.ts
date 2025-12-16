import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserRole } from './authReducer'

// Type

export type ContributionDetailData = {
    id: string,
    contributor_id: string,
    title: string,
    body: string,
    thumbnail: string,
    is_contibuted: boolean,
    is_viewed: boolean,
    latitude: string | null,
    longtitude: string | null,
    created_at: string,
    contributor: {
        id: string,
        supabase_id: string,
        name: string,
        email: string,
        phone_number: string,
        role: UserRole,
        banned: boolean,
        banned_by: string,
        profilepic: string,
        created_at: string,
        updated_at: string
    }
}

export type ContributionData = {
    id: string,
    contributor_id: string,
    title: string,
    body: string,
    thumbnail: string,
    is_contibuted: boolean,
    is_viewed: boolean,
    latitude?: number,
    longtitude?: number,
    created_at: string
}

export interface ContributionState {
    contributionDetailId: string | null,
    contributionDetail: ContributionData | null,
    data: ContributionData[],
    page: number,
    limit: number,
    total: number,
    totalPage: number
}

const initialState: ContributionState = {
    contributionDetailId: null,
    contributionDetail: null,
    data: [],
    page: 1,
    limit: 20,
    total: 0,
    totalPage: 1
}

export const ContributionSlice = createSlice({
    name: 'contribution',
    initialState,
    reducers: {
        pushData: (state, action: PayloadAction<{ data: ContributionData[] }>) => {
            if (action.payload.data.length === 0) return;

            const existingIds = new Set(state.data.map(item => item.id));

            const newItems = action.payload.data.filter(
                item => !existingIds.has(item.id)
            );

            // scroll xuống → append cuối
            state.data.push(...newItems);
        },

        addData: (state, action: PayloadAction<{ data: ContributionData }>) => {
            const item = action.payload.data;

            if (state.data.some(d => d.id === item.id)) return;

            const getTypeData = state.data[0].is_contibuted

            if (getTypeData !== item.is_contibuted) return;

            state.data.unshift(item);

            // giữ list gọn đúng số item đang hiển thị
            if (state.data.length > state.page * state.limit) {
                state.data.pop();
            }

            state.total += 1;
            state.totalPage = Math.ceil(state.total / state.limit);
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },

        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },

        setTotalPage: (state, action: PayloadAction<number>) => {
            state.totalPage = action.payload;
        },

        resetData: (state) => {
            state.data = [];
            state.page = 1;
            state.total = 0;
            state.totalPage = 1;
        },

        setContributionDetailId: (state, action: PayloadAction<{ id: string | null }>) => {
            const getId = action.payload.id
            if (getId) {
                state.contributionDetailId = getId
            } else {
                state.contributionDetailId = null
            }
        },

        setContributionDetail: (state, action: PayloadAction<{ contributionData: ContributionData | null }>) => {
            const getData = action.payload.contributionData
            if (getData && getData.id) {
                state.contributionDetail = getData
            }
        },

        removeDataById: (state, action: PayloadAction<{ id: string }>) => {
            const idToRemove = action.payload.id;

            // Xóa item khỏi data hiện tại
            state.data = state.data.filter(item => item.id !== idToRemove);

            // Cập nhật tổng số item và tổng page
            state.total = Math.max(state.total - 1, 0);
            state.totalPage = Math.max(Math.ceil(state.total / state.limit), 1);

            // Nếu contributionDetail trùng với id vừa xóa → reset
            if (state.contributionDetail?.id === idToRemove) {
                state.contributionDetail = null;
                state.contributionDetailId = null;
            }
        }

    },
})

export const {
    pushData,
    addData,
    setPage,
    setLimit,
    setTotal,
    setTotalPage,
    resetData,
    setContributionDetailId,
    setContributionDetail,
    removeDataById
} = ContributionSlice.actions

export default ContributionSlice.reducer