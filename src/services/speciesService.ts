import axios from "axios"
import api from "../config/gateway"

export type Species_Type = {
    id?: string,
    group?: string,
    phylum?: string,
    class?: string,
    order?: string,
    family?: string,
    genus: string,
    species: string,
    threatened_symbol?: string,
    impact?: string,
    description?: string,
    characteristic?: string,
    habitas?: string,
    distribution?: string,
    created_at?: Date
    updated_at?: Date
}

interface SpeciesCoordinate {
    latitude: string;
    longitude: string;
}

export interface SpeciesShortDetail {
    id: string;
    species: string;
    group: string;
    species_coordinates: SpeciesCoordinate[];
    thumbnails: { thumbnail: string, is_main: boolean }[];
}

export class SpeciesService {
    // Get all species for rendering on the map
    async getSpeciesShortDetail(): Promise<SpeciesShortDetail[]> {
        try {
            const species: SpeciesShortDetail[] = await api.get('/species/get-all-short')
            return species
            // return []
        } catch (error) {
            console.error(error)
            return []
        }
    }
}