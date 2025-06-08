import API from "@/lib/api";

export const getData = async () => {
    const token = localStorage.getItem('token');
    const res = await API.get('/data', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}