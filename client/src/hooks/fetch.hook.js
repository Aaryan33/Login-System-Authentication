import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                let url;
                
                if (!query) {
                    const { username } = !query ? await getUsername() : '';
                    url = `http://localhost:8088/api/user/${username}`;
                    // console.error("Fetching data from URL:", url);
                 } 

                console.log("Fetching data from URL:", url);
                const response = await axios.get(url);
                // const response = await axios({
                //     method:"get",
                //     baseURL:"http://localhost:8088/api",
                //     url:`${username}`
                // })
                // console.log(response);
        
                setData({
                    isLoading: false,
                    apiData: response.data,
                    status: response.status,
                    serverError: null // Reset server error if successful
                });
            } catch (error) {
                
                setData(prev => ({
                    isLoading: false,
                    apiData: undefined,
                    status: null,
                    serverError: error.response?.data || error.message // Use error response data if available, otherwise use error message
                }));
            }

        };
        fetchData()

    }, [query]);

    return [getData, setData];
}