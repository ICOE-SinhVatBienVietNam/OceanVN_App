import { configureStore } from '@reduxjs/toolkit'

// Reducer
import speciesReducer from './state/speciesReducer'
import authReducer from './state/authReducer'
import contributionReducer from './state/contributionReducer'

export const store = configureStore({
    reducer: {
        species: speciesReducer,
        auth: authReducer,
        contribution: contributionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch