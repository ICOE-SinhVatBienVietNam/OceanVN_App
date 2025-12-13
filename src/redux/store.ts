import { configureStore } from '@reduxjs/toolkit'

// Reducer
import speciesReducer from './state/speciesReducer'
import authReducer from './state/authReducer'

export const store = configureStore({
    reducer: {
        species: speciesReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch