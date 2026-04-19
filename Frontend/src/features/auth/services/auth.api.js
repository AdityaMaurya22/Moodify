import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true //cookies access karne ke liye use hota hai
})

export async function register({username, email, password}){
    const response = await api.post('/register', {
        username,
        email,
        password
    });
    return response.data;
}

export async function login({email, password}){
    const login = await api.post('/login', {
        email,
        password
    });
    return login.data;
}

export async function getMe(){
    const getme = await api.get('/get-me');
    return getme.data;
}

export async function logout(){
    const logout = await api.get('/logout');
    return logout.data;
}