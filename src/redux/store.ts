import { configureStore } from '@reduxjs/toolkit'

// Reducer
import speciesReducer from './state/speciesReducer'

export const store = configureStore({
    reducer: {
        species: speciesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch