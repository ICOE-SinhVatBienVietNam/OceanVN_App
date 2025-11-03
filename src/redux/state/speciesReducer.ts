import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Type
import { Species_Type, SpeciesShortDetail } from '../../services/speciesService'

export interface SpeciesState {
    speciesList: SpeciesShortDetail[]
    speciesListDiscovered: SpeciesShortDetail[]
}

const initialState: SpeciesState = {
    speciesList: [],
    speciesListDiscovered: [],
}

export const speciesSlice = createSlice({
    name: 'species',
    initialState,
    reducers: {
        setSpecies: (state, action: PayloadAction<SpeciesShortDetail[]>) => {
            state.speciesList = action.payload
        },

        setSpeciesDiscovered: (state, action: PayloadAction<SpeciesShortDetail[]>) => {
            state.speciesListDiscovered = action.payload
        }
    },
})

export const {
    setSpecies,
    setSpeciesDiscovered
} = speciesSlice.actions

export default speciesSlice.reducer