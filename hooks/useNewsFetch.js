import axios from "axios"
import { useEffect, useState } from "react"




const useNewsFetch = (count) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=crypto%20Currencies&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`
    const options = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': 'dbc9a9236bmsh739de702e5fe09ep1e57eejsn90ea05c93668',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
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