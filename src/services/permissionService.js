import { apiFetch } from "./apiService";


export const getPermissions = async () => {
    const response  = await apiFetch("permissions", "GET");
    return response;
}