import { useEffect, useState } from "react"
import { useContexto } from "../contexts/context"

const Obra = (props) => {
    const { setSelectClientesChanged, selectClientesChanged} = useContexto()
    //const { setSelectClientesChanged, selectClientesChanged } = props
    const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_OBRAS_BY_CLIENTE
    const [obras, setObra] = useState([])

    const fetchar = async (url) => { //para refactorizar a hook
        const data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify([{ cliente: selectClientesChanged.cliente }]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await data.json()
        //console.log(result);
        return result
    }

    useEffect(() => {
        fetchar(url).then(x => {
            setObra(x.datos)
        })
        setSelectClientesChanged({
            ...selectClientesChanged,
            obra: { id: '', nombre: '', direccion: '' },
        })
    }, [selectClientesChanged.cliente])


    const handleChange = (e) => {
        const index = e.target.selectedIndex
        const el = e.target.childNodes[index]
        const id = el.getAttribute('id')
        const direccion = el.getAttribute('direccion')
        const obra = { id: id, nombre: el.text, direccion: direccion }
        setSelectClientesChanged({
            ...selectClientesChanged,
            obra: obra,
        })
    }

    return (
        <>
            <select
                className="seleccionadores"
                // ref={selectRef}
                onChange={handleChange}
            >
                {
                    selectClientesChanged.obra.id ?
                        (
                            <option
                                key={selectClientesChanged.obra.id}
                                id={selectClientesChanged.obra.id}
                                direccion={selectClientesChanged.obra.direccion}
                            >
                                {selectClientesChanged.obra.nombre}
                            </option>
                        ) :
                        (
                            <option selected disabled>seleccionar OBRA</option>

                        )
                }
                {
                    obras.map(x =>
                        <option
                            key={x.id_obras}
                            id={x.id_obras}
                            value={x.id_obras}
                            direccion={x.direccion}
                        >
                            {x.nombre}

                        </option>
                    )
                }

            </select>
        </>
    )
}

export default Obra