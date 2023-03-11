import { createContext, useContext, useState, useRef } from "react"
import useAnimacion from "../hooks/useAnimacion"

export const MiContexto = createContext()

export const ContextoProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(0)
  const [vista, setVista] = useState(1)
  const refanimacion = useRef()
  const { animar } = useAnimacion(refanimacion)
  const [selectClientesChanged, setSelectClientesChanged] = useState(
    {
      cliente: '',
      obra: { id: '', nombre: '', direccion: '' },
      motohormigoneras: [],
      mh: { id: '', patente: '', modelo: '' },
      todos: [],
      recientes: [],
      formulas: [],
      formulasRecientes: [],
      dosificacion: { id: '', tipo: '', m3: 0, bomba: false },
      chofer: { id: '', nombre: '' },
      choferRecientes: [],
      choferTodos: []
    }
  )
  return <MiContexto.Provider value={{ autenticado, setAutenticado, vista, setVista, refanimacion, animar, selectClientesChanged, setSelectClientesChanged}}>
   {children}
   </MiContexto.Provider>
}

export const useContexto = () => {
  const context = useContext(MiContexto)
  if (context === undefined) {
    throw new Error('Contexto must be used within a Provider')
  }
  return context
}