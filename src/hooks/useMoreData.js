import { useEffect } from "react"
import { useState } from "react"

//cuando necesitamos mas informacion de algo
const useMoreData = (url, datoABuscar) => {
    
    const [data, setData] = useState([])

    const fetchar = () => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ dato: datoABuscar }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(x => x.json())
            .then(x => setData(x))
    }

    useEffect(() => {
        fetchar()
    }, [])

    return { data }

}

export default useMoreData