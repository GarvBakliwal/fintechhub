import API from "@/lib/api";

export const signUpUser = async (data: any) => {
    const response = await API.post('/signup', data);
    return response.data;
}

export const loginUser = async (data: any) => {
    const response = await API.post('/login', data);
    console.log("LOGIN RESPONSE:", response.data);
    console.log("Browser cookies:", document.cookie);
    return response.data;
}