import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
};

export const createData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création des données :", error);
        throw error;
    }
};

export const updateData = async (endpoint: string, id: number, data: any) => {
    try {
        const response = await axios.put(`${API_URL}/${endpoint}/${id}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données :", error);
        throw error;
    }
};

export const deleteData = async (endpoint: string, id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${endpoint}/${id}`, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression des données :", error);
        throw error;
    }
};
