import axios from "axios";
import { useState, useEffect } from "react";
import { RAPID_API_KEY } from "../KEYS";


const useTranslate = (term) => {

    const [tData, setData] = useState()
    const [tError, setError] = useState(null)
    const [isTLoading, setIsTLoading] = useState(true)


    const encodedParams = new URLSearchParams();
    term && encodedParams.set('q', term);
    encodedParams.set('target', 'fr');
    encodedParams.set('source', 'en');

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  data: encodedParams,
};

const fetchData = async () => {

    setIsTLoading(true)

    try {
        const response = await axios.request(options);
        setData(response.data)

        setIsTLoading(false)
    } catch (error) {
        setError(error)
        setIsTLoading(false)
    }finally {
        setIsTLoading(false)
    }

}

useEffect(() => {
    fetchData()
}, [])


return {tData, tError, isTLoading}

}

export default useTranslate