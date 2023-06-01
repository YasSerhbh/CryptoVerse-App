import { useState, useEffect } from "react";
import axios from "axios";


const useCoinFetch = (endpoint, query) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState(null)



    const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': 'dbc9a9236bmsh739de702e5fe09ep1e57eejsn90ea05c93668',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    
    
    const fetchData = async () => {

        setIsLoading(true)

        try {
            const response = await axios.request(options);
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return {isLoading, data, error, refetch};

}

export default useCoinFetch