import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Type
import { Species_Type, SpeciesShortDetail } from '../../services/speciesService'

export interface SpeciesState {
    speciesList: SpeciesShortDetail[]
    speciesListDiscovered: SpeciesShortDetail[]
    speciesDetailID: string
    speciesDetail: Species_Type
}

const initialState: SpeciesState = {
    speciesList: [] as SpeciesShortDetail[],
    speciesListDiscovered: [] as SpeciesShortDetail[],
    speciesDetailID: "",
    speciesDetail: {} as Species_Type

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
        },

        setSpeciesDetailID: (state, action: PayloadAction<string>) => {
            state.speciesDetailID = action.payload
        },

        setSpeciesDetail: (state, action: PayloadAction<Species_Type>) => {
            state.speciesDetail = action.payload
        }
    },
})

export const {
    setSpecies,
    setSpeciesDiscovered,
    setSpeciesDetailID,
    setSpeciesDetail
} = speciesSlice.actions

export default speciesSlice.reducer