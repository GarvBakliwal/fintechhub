import API from "@/lib/api";

export const getData = async (token?: string) => {
    // On the server, token must be passed from cookies()
    // On the client, it fallbacks to localStorage (current implementation)
    const finalToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

    if (!finalToken) throw new Error("No authentication token found");

    const res = await API.get('/data', {
        headers: { Authorization: `Bearer ${finalToken}` }
    });
    return res.data;
}