
import { Routes, Route } from "react-router-dom"
import './App.css'
import Boton from './components/Boton'
import Layout from './components/Layout'
import AddObra from './components/obras-form/AddObra'
import NotAuth from './components/NoAuth'
import Login from './components/Login'
import InfoCliente from './components/InfoCliente'
import { useContexto } from './contexts/context.js'

function App() {

  const { animar, refanimacion, autenticado, setAutenticado } = useContexto()

  animar()
   
  return (

    <div>

      <Routes>
        <Route exact path="/remitos" element={
          <div className="App" ref={refanimacion}>
            <div className="filaSuperior">
              <Layout />
            </div>
            <div className="filaInferior">
              {
                <Boton
                  clase={'boton atras'}
                  texto={'Atras'}
                />
              }
              {
                <Boton
                  clase={'boton siguiente'}
                  texto={'Siguiente'}
                >
                </Boton>
              }
            </div>
          </div>
        } />

        <Route
          path="/remitos/add-obra"
          element={autenticado ? <AddObra /> : <Login setAuth={setAutenticado} />}
        //element={ <AddObra  />}
        />
        <Route path="/remitos/no-autenticado" element={<NotAuth />} />
        <Route path="/remitos/add-obra" element={<AddObra />} />
        <Route path="/remitos/info-cliente/:id" element={<InfoCliente />} />
      </Routes>

    </div>


  )
}


export default App


