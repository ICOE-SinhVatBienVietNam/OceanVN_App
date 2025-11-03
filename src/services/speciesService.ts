import axios from "axios"
import api from "../config/gateway"

export type Species_Type = {
    id?: string,
    group?: string,
    phylum?: string,
    class?: string,
    order?: string,
    famila?: string,
    genus: string,
    species: string,
    name: string,
    threatened_symbol?: string,
    impact?: string,
    description?: string,
    characteristic?: string,
    color?: string,
    distribution?: string,
}

interface SpeciesCoordinate {
  latitude: string;
  longitude: string;
}

export interface SpeciesShortDetail {
  id: string;
  name: string;
  species_coordinates: SpeciesCoordinate[];
  thumbnail: {thumbnail: string}[];
}

export class SpeciesService {
    // Get all species for rendering on the map
    async getSpeciesShortDetail(): Promise<SpeciesShortDetail[]> {
        try {
            const species: SpeciesShortDetail[] = await api.get('/species/get-all-short')
            // return species
            return []
        } catch (error) {
            console.error(error)
            return []
        }
    }
}