import axios from 'axios';
import { Shelter, ShelterResults, ShelterContributionRequest, ShelterContributionResponse } from '@/types/shelters/contribute';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchShelters = async (): Promise<Shelter[]> => {
    const response = await axios.get<{ shelters: Shelter[] }>(`${API_BASE_URL}`);
    return response.data.shelters;
};

export const fetchShelterResults = async (): Promise<ShelterResults> => {
    const response = await axios.get<ShelterResults>(`${API_BASE_URL}/results`);
    return response.data;
};


export const contributeToShelter = async (data: ShelterContributionRequest): Promise<ShelterContributionResponse> => {
    const response = await axios.post<ShelterContributionResponse>(`${API_BASE_URL}/contribute`, data);
    return response.data;
};
