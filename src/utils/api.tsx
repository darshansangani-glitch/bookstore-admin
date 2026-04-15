
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// function getHeaders() {
//     return {
//         "Content-Type": "application/json",
//         "Authorization": token ? ` ${token}` : "",
//     };
// };

export const api = {
    get: async (endpoint: string, token: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Authorization": token ? ` ${token}` : "",
            },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    },

    post: async (endpoint: string, data: any, token: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? ` ${token}` : "",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    },

    put: async (endpoint: string, data: any, token: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? ` ${token}` : "",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    },

    delete: async (endpoint: string, token: string) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? ` ${token}` : "",
            },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    }
};