import axios from "axios"
import { useEffect, useState } from "react"
import { RAPID_API_KEY } from "../KEYS"




const useNewsFetch = (count) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    const url = `https://crypto-news16.p.rapidapi.com/news/top/${count}`
    const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
      }
};
    

    const fetchData = async () => {

    setIsLoading(true)

    
        try {
            const response = await fetch(url, options);
	        const result = await response.text();
            setData(JSON.parse(result))
            setIsLoading(false)
        } catch (error) {
            setError(error)
            setIsLoading(false)
        } finally {
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


    return {data, isLoading, error, refetch}
}

export default useNewsFetch