const API_URL = "http://localhost:8080";

const fetchData = async (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    try {
        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`ERROR ${response.status}: ${response.statusText}`);
        }

        if (requestOptions.method !== 'DELETE') {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};


// Helper function to filter out null or undefined params
const filterParams = (params = {}) => 
    Object.fromEntries(Object.entries(params).filter(([_, value]) => value != null));

export const apiGet = (url, params = {}) => {
    const queryString = new URLSearchParams(filterParams(params)).toString();
    const apiUrl = queryString ? `${url}?${queryString}` : url;

    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};

export const apiPost = (url, data, headers = {}) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiPut = (url, data, headers = {}) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiDelete = (url, headers = {}) => {
    const requestOptions = {
        method: "DELETE",
        headers,
    };

    return fetchData(url, requestOptions);
};
