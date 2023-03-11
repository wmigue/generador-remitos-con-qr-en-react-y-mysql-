import { useState } from "react"
import { useEffect } from "react"

const useFetchGetFast = (url) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchar = () => {
        fetch(url)
            .then((response) => response.json())
            .then(x => {
                setData(x)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchar()
    }, [])

    return { data, loading }
}

export default useFetchGetFast