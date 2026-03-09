export const signUpUser = async (data: any) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw { response: { data: result } };

    // Store token for direct backend API calls (plaid, data, etc.)
    if (result.token) {
        localStorage.setItem('token', result.token);
    }
    return result;
}

export const loginUser = async (data: any) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw { response: { data: result } };

    // Store token for direct backend API calls (plaid, data, etc.)
    if (result.token) {
        localStorage.setItem('token', result.token);
    }
    return result;
}

export const logoutUser = async () => {
    localStorage.removeItem('token');
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
    });
    return response.json();
}