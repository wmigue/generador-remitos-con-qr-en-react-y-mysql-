import { useEffect, useRef } from "react"
import useFetch from "../hooks/useFetch"
import { useContexto } from "../contexts/context"

const Motohormigonera = () => {

  const { setSelectClientesChanged, selectClientesChanged } = useContexto()
  
  const selectRef = useRef({})
  const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_MH_ALL
  const { data, loading } = useFetch(url, selectClientesChanged, setSelectClientesChanged, 'motohormigoneras')
  console.log(data)

  const handleChange = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const id = el.getAttribute('id')
    const patente = el.getAttribute('patente')
    const modelo = el.getAttribute('modelo')
    const mh = { ...selectClientesChanged.mh, id: id, patente: patente, modelo: modelo }

    setSelectClientesChanged({
      ...selectClientesChanged,
      mh: mh,
    })
  }

  useEffect(() => {
    //console.log(selectClientesChanged.cliente)
    selectRef.current.value = selectClientesChanged.mh.patente
  }, [selectClientesChanged.mh])


  return (
    <>
      {loading ? <p>cargando...</p> :
        <>
          <select
            className="seleccionadores"
            ref={selectRef}
            onChange={handleChange}
          >
            {
              selectClientesChanged.mh.patente !== '' ?
                (
                  <option
                    key={selectClientesChanged.mh.patente}
                    id={selectClientesChanged.mh.id}
                    patente={selectClientesChanged.mh.patente}
                    modelo={selectClientesChanged.mh.modelo}
                    value={selectClientesChanged.mh.patente}
                  >
                    {selectClientesChanged.mh.patente}
                  </option>
                ) :
                (
                  <option selected disabled>seleccionar MOTOHORMIGONERA</option>

                )
            }
            {

              selectClientesChanged.motohormigoneras.length > 0 ?
                selectClientesChanged.motohormigoneras.map(x =>
                  <option
                    key={x.id_mh}
                    id={x.id_mh}
                    patente={x.patente}
                    modelo={x.modelo}
                    value={x.patente}
                  >
                    {x.patente}

                  </option>
                ) :
                data.map(x =>
                  <option
                    key={x.id_mh}
                    id={x.id_mh}
                    patente={x.patente}
                    modelo={x.modelo}
                    value={x.patente}
                  >
                    {x.patente}
                  </option>
                )
            }

          </select>
        </>
      }
    </>
  )
}



export default Motohormigonera