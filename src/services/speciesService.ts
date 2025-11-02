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
    threatened_level?: string,
    impact?: string,
    description?: string,
    characteristic?: string,
    color?: string,
    distribution?: string,
}

export class SpeciesService {

    // Get all species for rendering on the map
    async getSpeciesShortDetail(): Promise<Species_Type[]> {
        try {
            const species: Species_Type[] = await api.get('/species/get-all-short')
            console.log(species)
            return species
        } catch (error) {
            console.error(error)
            return []
        }
    }
}