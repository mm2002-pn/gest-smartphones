import { apiFetch } from "./apiService";



export const getArticles = async () => {
    const response  = await apiFetch("articles", "GET");
    return response;
}

export const getArticle = async (id) => {
    console.log(id);
    const response = await apiFetch(`articles?id=${id}`, "GET");
    return response;
}



export const createArticle  =  async (data) =>{
    if(data.id){
        return updateArticle(data.id, data);
    }
    const response = await apiFetch("articles", "POST", data);
    return response;
}



export const updateArticle = async (id, data) => {  
    const response = await apiFetch(`articles/${id}`, "PUT", data);
    return response;
}

export const deleteArticle = async (id) => {
    const response = await apiFetch(`articles/${id}`, "DELETE");
    return response;
}