import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api/",
    params: {
        key: '31858870-09ead0999ee20650dc52876fe',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
}
)

export const searchPosts = async(q, page = 1,  per_page = 12)=> {
    const {data} = await instance.get("/", {
        params: {
            q,
            page,
            per_page,
            
        }
    });
    
    return data.hits;
}

export const getAllPosts = async()=> {
    const {data} = await instance.get("/");
    console.log(data.hits);
    return data.hits;
}