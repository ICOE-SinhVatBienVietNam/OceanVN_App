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
    },
    expires_at: number
}

export interface AuthState {
    isAuth: boolean
    user: userData['user'] | null
    userPosition?: [number, number]
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    userPosition: undefined
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

        setUserData: (
            state,
            action: PayloadAction<{ userData: userData['user'] | null }>
        ) => {
            state.user = action.payload.userData;
        },

        setPosition: (state, action: PayloadAction<{ lat: number, lng: number } | null>) => {
            state.userPosition = action.payload ? [action.payload.lat, action.payload.lng] : undefined
        }
    },
})

export const {
    setAuth,
    setUserData,
    setPosition
} = AuthSlice.actions

export default AuthSlice.reducer