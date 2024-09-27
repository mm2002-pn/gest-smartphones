import { apiFetch } from "./apiService";

export const getUsers = async () => {
    const response  = await apiFetch("users", "GET");
    return response;
}

export const getUser = async (id) => {
    const response = await apiFetch(`users?id=${id}`, "GET");
    return response;
}

export const createUser  =  async (data) =>{
    if(data.id){
        return updateUser(data.id, data);
    }
    const response = await apiFetch("users", "POST", data);
    return response;
}


export const updateUser = async (id, data) => {
    const response = await apiFetch(`users/${id}`, "PUT", data);
    return response;
}


export const deleteUser = async (id) => {
    const response = await apiFetch(`users/${id}`, "DELETE");
    return response;
}

// connection

export const connectUser = async (param,data) => {
    const response = await apiFetch(param, "GET", data);
    return response;
}


