export const useAPI = () => {
    const api_url = 'http://127.0.0.1:8000/'

    const get_endpoint = (endPoint: string) => {
        return api_url + endPoint;
    };

    const fetchAPI = async (endPoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: string) => {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options: RequestInit = {
            method: method,
            headers: headers
        };

        if (body) {
            options.body = body;
        }

        try {
            const response = await fetch(get_endpoint(endPoint), options);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null; // Return null to indicate failure in a more predictable way
        }
    };

    const get = (endPoint: string) => fetchAPI(endPoint, 'GET');
    const post = (endPoint: string, body: string) => fetchAPI(endPoint, 'POST', body);
    const put = (endPoint: string, body: string) => fetchAPI(endPoint, 'PUT', body);
    const delet = (endPoint: string) => fetchAPI(endPoint, 'DELETE');

    return { get_endpoint, get, post, put, delet };
};
