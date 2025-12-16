import axios from "axios"
import api from "../config/gateway"

export type Species_Type = {
    id: string;
    group: string | null;
    phylum: string | null;
    class: string | null;
    order: string | null;
    family: string | null;
    genus: string;
    species: string;
    threatened_symbol: string | null;
    impact: string | null;
    description: string | null;
    characteristic: string | null;
    habitas: string | null;
    distribution_vietnam: string | null;
    distribution_world: string | null;
    created_at: Date;
    updated_at: Date;
    species_coordinates: SpeciesCoordinate[] | [];
    common_names: SpeciesCommonName[] | [];
    references: SpeciesReferences[] | [];
    thumbnails: SpeciesThumbnail[] | [];
}

interface SpeciesCoordinate {
    species_id: string;
    latitude: string;
    longitude: string;
}

interface SpeciesReferences {
    species_id: string;
    display_name: string;
    path: string | null;
}

interface SpeciesCommonName {
    species_id: string;
    name: string | null;
}

interface SpeciesThumbnail {
    species_id: string;
    thumbnail: string;
    is_main: boolean;
}

export interface SpeciesShortDetail {
    id: string;
    group: string | null;
    phylum: string | null;
    class: string | null;
    order: string | null;
    genus: string;
    species: string;
    threatened_symbol: string | null,
    species_coordinates: SpeciesCoordinate[] | [];
    thumbnails: SpeciesThumbnail[] | [];
}

export class SpeciesService {
    // Get all species for rendering on the map
    async getSpeciesShortDetail(signal?: AbortSignal): Promise<SpeciesShortDetail[]> {
        try {
            const { data, status } = await api.get('/species/get-all-short', { signal })
            if (status === 200) {
                return data as SpeciesShortDetail[]
            } else return []
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error(error)
            }
            return []
        }
    }

    // Get one species base on ID
    async getSpeciesID(id: string, signal?: AbortSignal): Promise<Species_Type | undefined> {
        try {
            const { data, status } = await api.get('/species/' + id, { signal })
            if (status === 200) {
                return data as Species_Type
            } else return undefined
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error(error)
            }
            return undefined
        }
    }

}