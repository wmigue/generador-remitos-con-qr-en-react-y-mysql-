
import { useEffect, useState } from 'react'

const useFetch = (url, selectClientesChanged, setSelectClientesChanged, contexto) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = () => {
        selectClientesChanged[contexto].length ===0 ? (  //si ya hay registros no es necesario hacer el fetch
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setData(data)
                    setSelectClientesChanged({ ...selectClientesChanged, [contexto]: data })
                    setLoading(false)
                })
        ) :
        (
            setLoading(false)
        )        

    }

    useEffect(() => {
        fetchData()
    }, [])


    return { loading, data }
}


export default useFetch