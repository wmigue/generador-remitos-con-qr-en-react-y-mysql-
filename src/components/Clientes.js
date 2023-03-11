import { useEffect, useRef } from "react"
import useFetch from "../hooks/useFetch"
import { useContexto } from "../contexts/context"

function Clientes(props) {
  //const { setSelectClientesChanged, selectClientesChanged } = props
  const { setSelectClientesChanged, selectClientesChanged} = useContexto()
  const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_CLIENTES_ALL
  const { data, loading } = useFetch(url, selectClientesChanged, setSelectClientesChanged, 'todos')
  const selectRef = useRef({})


  const handleChange = (e) => {
    setSelectClientesChanged({
      ...selectClientesChanged,
      cliente: e.target.value,
      obra: { id: '', nombre: '', direccion: '' },
      recientes: selectClientesChanged.recientes.indexOf(e.target.value) < 0 && selectClientesChanged.recientes.length <= 6 ?
        [...selectClientesChanged.recientes, e.target.value] :
        [...selectClientesChanged.recientes]
    })
  }


  useEffect(() => {
    //console.log(selectClientesChanged.cliente)
    selectRef.current.value = selectClientesChanged.cliente
  }, [selectClientesChanged.cliente])



  return (
    <>
      {loading ? <p>cargando... </p> :
        <>
          <select
            className="seleccionadores"
            ref={selectRef}
            onChange={handleChange}
          >
            {
              selectClientesChanged.cliente ?
                (
                  <option>{selectClientesChanged.cliente}</option>
                ) :
                (
                  <option selected disabled>seleccionar CLIENTE</option>

                )
            }
            {

              selectClientesChanged.todos.length > 0 ?
                selectClientesChanged.todos.map(x =>
                  <option
                    key={x.id}
                    value={x.nombre}>
                    {x.nombre}</option>
                ) :
                data.map(x =>
                  <option
                    key={x.id}
                    value={x.nombre}>
                    {x.nombre}
                  </option>
                )
            }

          </select>
        </>
      }
    </>
  )
}


export default Clientes