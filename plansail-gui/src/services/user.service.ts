import axios from 'axios';
import { API_BASE_URI } from './config';

export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URI}/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}