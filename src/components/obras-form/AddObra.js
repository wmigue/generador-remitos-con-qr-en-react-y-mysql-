
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import useFetchGetFast from "../../hooks/useFetchGetFast"
import Mapa from "../Mapa"

const AddObra = () => {
    const API_KEY2 = 'AIzaSyAIL8r1EkGRKKZ5I-wZCdXewi80CSEiqXk'
    const urlMapa = "https://www.google.com/maps/embed/v1/place?key=" + API_KEY2 + "&q="
    const [direccionMapa, setDireccionMapa] = useState('')


    const [pass, setPass] = useState(0)
    const [cliente, setCliente] = useState('')
    const [obra, setObra] = useState([])
    const [botonguardar, setBotonGuardar] = useState(1)
    const selectclientes = useRef('Seleccionar')
    const nombredeobra = useRef()
    const direcciondeobra = useRef()
    const distanciaobra = useRef()
    const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_CLIENTES_ALL
    const url2 = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_OBRAS_BY_CLIENTE
    const url3 = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_SAVE_OBRA_OF_CLIENTE
    const { data, loading } = useFetchGetFast(url)

    const fetchar = async (uri, d) => {
        const r = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify([d]),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await r.json()
        return data.datos
    }


    const handleChange = (e) => {
        setCliente(e.target.value)
    }


    const handleSave = () => {
        if (distanciaobra.current.value != '' && nombredeobra.current.value != '' && direcciondeobra.current.value != '') {
            fetchar(url3, {
                cliente: cliente,
                nombredeobra: nombredeobra.current.value,
                direcciondeobra: direcciondeobra.current.value,
                distanciaobra: distanciaobra.current.value
            })
            setBotonGuardar(0)
            alert("obra agregada")
            fetchar(url2, { cliente: cliente }).then(x => setObra(x))
            nombredeobra.current.value = ''
            direcciondeobra.current.value = ''
        } else {
            alert("❌❌❌ Completar todos los campos antes de agregar una obra ")
        }
    }


    useEffect(() => {
        fetchar(url2, { cliente: cliente }).then(x => {
            setObra(x)
            console.log(obra)
        })
    }, [cliente])


    const handleDireccionChange = (e) => {
        setTimeout(() => {
            setDireccionMapa(urlMapa + e.target.value)
            console.log(e.target.value)
        }, 4000)
    }


    const verMapaClienteID = (parametro) => {


    }




    return (
        <div className="container pt-5 w-50 b">
            {
                loading ?
                    (
                        <p>cargando...</p>
                    ) :
                    (

                        <select
                            onChange={handleChange}
                            ref={selectclientes}
                            class="form-select"
                            aria-label="Default select example"
                        >
                            <option selected disabled>Seleccionar</option>
                            {
                                data.map(x => <option id={x.id} value={x.nombre}>{x.nombre}</option>)
                            }
                        </select>
                    )

            }
            {
                obra.length > 0 ?
                    (
                        <div class="mb-3 mt-5 guardarobra2">
                            <label for="exampleFormControlInput1" class="form-label">OBRAS DE: <b>{cliente}</b></label>

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">nombre obra</th>
                                        <th scope="col">dirección</th>
                                        <th scope="col">distancia planta-obra</th>
                                        <th scope="col">ver mapa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        obra.map((x, i) =>
                                        (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{x.nombre}</td>
                                                <td>{x.direccion}</td>
                                                <td>{x.distancia}</td>
                                                <td>
                                                    <Link to={`/remitos/info-cliente/${x.direccion}`}>
                                                        <button className="btn">GPS</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    ) :
                    (
                        <div> {"no se encontraron obras de este cliente."} </div>
                    )

            }

            {
                selectclientes.current.value != 'Seleccionar' ?
                    <div className="container guardarobra">
                        <label for="exampleFormControlInput1" class="form-label">AGREGAR OTRA</label>
                        <input
                            type="text"
                            ref={nombredeobra}
                            class="form-control m-3 w-75"
                            id="exampleFormControlInput1"
                            placeholder="NOMBRE DE OBRA"
                        />


                        <input
                            type="text"
                            ref={distanciaobra}
                            class="form-control m-3 w-75 "
                            id="exampleFormControlInput1"
                            placeholder="DISTANCIA [PLANTA->OBRA]"
                        />

                        <input
                            type="text"
                            ref={direcciondeobra}
                            onChange={handleDireccionChange}
                            className="form-control m-3 w-75"
                            id="exampleFormControlInput1"
                            placeholder="DIRECCION DE OBRA"
                        />

                        <Mapa
                            direccion={direccionMapa}
                        >
                        </Mapa>
                        {
                            //botonguardar ?
                            <button type="button" className="btn btn-danger text-center" onClick={handleSave}>GUARDAR</button>

                        }

                    </div> : null
            }




        </div >

    )
}

export default AddObra