import { apiFetch } from "./apiService";



export const getRoles = async () => {
    const response  = await apiFetch("roles", "GET");
    return response;
}


export const getRole = async (id) => {
    const response = await apiFetch(`roles?id=${id}`, "GET");
    return response;
}


export const createRole  =  async (data) =>{
    if(data.id){
        return updateRole(data.id, data);
    }
    const response = await apiFetch("roles", "POST", data);
    return response;
}


export const updateRole = async (id, data) => {
    const response = await apiFetch(`roles/${id}`, "PUT", data);
    return response;
}

export const deleteRole = async (id) => {
    const response = await apiFetch(`roles/${id}`, "DELETE");
    return response;
}