




export const setItem = (item, content) =>{
    sessionStorage.setItem(item, content);
}
export const getItem = (item) =>{
    return sessionStorage.getItem(item);
}