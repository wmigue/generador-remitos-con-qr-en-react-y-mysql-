import { useEffect, useRef } from "react"
import NumPad from 'react-numpad'
import useFetch from "../hooks/useFetch"
import Check from "./Check"
import Titulo from "./Titulo"
import { useContexto } from "../contexts/context"

function Dosificacion(props) {
  
  
    const { setSelectClientesChanged, selectClientesChanged} = useContexto()
  //const { setSelectClientesChanged, selectClientesChanged } = props
  const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_DOSIFICACIONES_ALL
  const { data, loading } = useFetch(url, selectClientesChanged, setSelectClientesChanged, 'formulas')
  const selectRef = useRef({})

  const handleChange = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const id = el.getAttribute('id')
    const dosificacion = { ...selectClientesChanged.dosificacion, id: id, tipo: e.target.value, m3: selectClientesChanged.dosificacion.m3 }
    setSelectClientesChanged({
      ...selectClientesChanged,
      dosificacion: dosificacion,
      formulasRecientes: selectClientesChanged.formulasRecientes.length <= 6 &&
        selectClientesChanged.formulasRecientes.filter(x => x.id === id).length === 0 ?
        [...selectClientesChanged.formulasRecientes, { id: dosificacion.id, tipo: dosificacion.tipo }] :
        selectClientesChanged.formulasRecientes
    })
  }

  const handleChangeM3 = (value) => {
    const index = selectRef.current.selectedIndex
    const el = selectRef.current.childNodes[index]
    const id = el.getAttribute('id')
    const dosificacion = { ...selectClientesChanged.dosificacion, id: id, tipo: selectRef.current.value, m3: value }
    setSelectClientesChanged({ ...selectClientesChanged, dosificacion: dosificacion })
  }

  useEffect(() => {
    //cuando cambia la dependencia dosificacion, agrego un item al select con la misma dosificacion.
    selectRef.current.value = selectClientesChanged.dosificacion.tipo
  }, [selectClientesChanged.dosificacion.tipo])

  return (
    <>
      {loading ? <p>cargando...</p> :
        <>
          <select
            className='seleccionadores'
            onChange={handleChange}
            ref={selectRef}
          >
            {
              selectClientesChanged.dosificacion.tipo === '' ?
                <option selected disabled>seleccionar DOSIFICACION</option> :
                <option id={selectClientesChanged.dosificacion.id} value={selectClientesChanged.dosificacion.tipo}>{selectClientesChanged.dosificacion.tipo}</option>
            }
            {
              selectClientesChanged.formulas.length > 0 ?
                selectClientesChanged.formulas.map(x => <option key={x.id} id={x.id} value={x.nombre}>{x.nombre}</option>) :
                data.map(x => <option key={x.id} id={x.id} value={x.nombre}>{x.nombre}</option>)
            }
          </select>
          <div>
            <NumPad.Number
              onChange={(value) => { handleChangeM3(value) }}
              label={''}
              placeholder={'my placeholder'}
              value={selectClientesChanged.dosificacion.m3}
              decimal={2}
            >
              <button className="m3">
                seleccionar M3
              </button>
            </NumPad.Number>
            <Titulo>
              {
                selectClientesChanged.dosificacion.m3 === undefined ?
                  "0 M³" :
                  selectClientesChanged.dosificacion.m3 + " M³"
              }
            </Titulo>
            <Check
              setSelectClientesChanged={setSelectClientesChanged}
              selectClientesChanged={selectClientesChanged}
            />
          </div>
        </>
      }
    </>
  )

}




export default Dosificacion