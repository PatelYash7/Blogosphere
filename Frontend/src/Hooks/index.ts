import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    console.log(localStorage.getItem("token"))

    useEffect(() => {
        axios.get(`${Backend_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            }).catch(e=>console.log(e))
    }, [])

    return {
        loading,
        blogs
    }
}