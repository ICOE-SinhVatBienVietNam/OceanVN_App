import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Type
import { Species_Type } from '../../services/speciesService'

export interface SpeciesState {
    speciesList: Species_Type[]
}

const initialState: SpeciesState = {
    speciesList: [],
}

export const speciesSlice = createSlice({
    name: 'species',
    initialState,
    reducers: {
        setSpecies: (state, action: PayloadAction<Species_Type[]>) => {
            state.speciesList = action.payload
        }
    },
})

export const { setSpecies } = speciesSlice.actions

export default speciesSlice.reducer