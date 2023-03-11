import { useEffect, useRef } from "react"
import useFetch from "../hooks/useFetch"
import { useContexto } from "../contexts/context"


const Chofer = (props) => {

  const { setSelectClientesChanged, selectClientesChanged } = useContexto()
  //const { setSelectClientesChanged, selectClientesChanged } = props
  const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_CHOFER_ALL
  const { data, loading } = useFetch(url, selectClientesChanged, setSelectClientesChanged, 'choferTodos')
  const selectRef = useRef({})


  const handleChange = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const id = el.getAttribute('id')
    const chofer = { ...selectClientesChanged.chofer, id: id, nombre: e.target.value }

    setSelectClientesChanged({
      ...selectClientesChanged,
      chofer: chofer,
      choferRecientes: selectClientesChanged.choferRecientes.indexOf(chofer) < 0 && selectClientesChanged.choferRecientes.length <= 6 ?
        [...selectClientesChanged.choferRecientes, chofer] :
        [...selectClientesChanged.choferRecientes]
    })
  }

  useEffect(() => {
    //console.log(selectClientesChanged.cliente)
    selectRef.current.value = selectClientesChanged.chofer.nombre
  }, [selectClientesChanged.chofer])


  return (
    <>
      {
        loading ? <p>cargando...</p> :
          <>

            <select
              className="seleccionadores"
              ref={selectRef}
              onChange={handleChange}
            >
              {
                selectClientesChanged.chofer.nombre !== '' ?
                  (
                    <option
                      key={selectClientesChanged.chofer.id}
                      id={selectClientesChanged.chofer.id}>{selectClientesChanged.chofer.nombre}
                    </option>
                  ) :
                  (
                    <option selected disabled>seleccionar chofer</option>

                  )
              }
              {

                selectClientesChanged.choferTodos.length > 0 ?
                  selectClientesChanged.choferTodos.map(x =>
                    <option
                      key={x.id}
                      id={x.id}
                      value={x.nombre + ' ' + x.apellido}>
                      {x.nombre + ' ' + x.apellido}
                    </option>
                  ) :
                  data.map(x =>
                    <option
                      key={x.id}
                      id={x.id}
                      value={x.nombre + ' ' + x.apellido}>
                      {x.nombre + ' ' + x.apellido}
                    </option>
                  )
              }

            </select>
          </>
      }
    </>
  )
}



export default Chofer