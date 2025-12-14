import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Type
export type UserRole = "superadmin" | "admin" | "editor" | "viewer" | "superuser" | "user"

export type userData = {
    accessToken: string,
    refreshToken: string,
    user: {
        id: string,
        supabase_id: string,
        name: string,
        email: string,
        phone_number: string | number | null,
        role: UserRole,
        banned: boolean,
        created_at: string,
        updated_at: string
    }
}

export interface AuthState {
    isAuth: boolean
    user: userData['user'] | {}
}

const initialState: AuthState = {
    isAuth: false,
    user: {}
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ auth: boolean }>) => {
            if (state.isAuth != action.payload.auth) {
                state.isAuth = action.payload.auth
            }
        },

        setUserData: (state, action: PayloadAction<{ userData: userData['user'] | {} }>) => {
            if (Object.keys(action.payload.userData).length > 0) {
                state.user = action.payload.userData
            } else state.user = {}
        }
    },
})

export const {
    setAuth,
    setUserData
} = AuthSlice.actions

export default AuthSlice.reducer