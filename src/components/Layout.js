
import Clientes from './Clientes'
import ClientesRecientes from './ClientesRecientes'
import Dosificacion from './Dosificacion'
import FormolasRecientes from './FormulasRecientes'
import Chofer from './Chofer'
import Obra from './Obra'
import PDF from './PDF'
import Motohormigonera from './Motohormigonera'
import { useContexto } from "../contexts/context"

function Layout() {

  const {vista, selectClientesChanged} = useContexto()

  return (
    <div className='layout'>
      {
        vista === 1 ?
          (
            <div className='unafiladoscolumnas'>
              <div>
                <ClientesRecientes
            
                >
                </ClientesRecientes>
              </div>
              <div>
                <Clientes
        
                >
                </Clientes>
              </div>
              {
                selectClientesChanged.cliente ?
                  (
                    <div>
                      <Obra
            
                      >
                      </Obra>
                    </div>
                  ) : null
              }
            </div>
          )
          :
          vista === 2 ?
            (
              <div className='unafiladoscolumnas'>
                <div>
                  <FormolasRecientes
                  
                  >
                  </FormolasRecientes>
                </div>
                <div>
                  <Dosificacion

                  >
                  </Dosificacion>
                </div>
              </div>
            ) :
            vista === 3 ?
              (
                <div className='unafiladoscolumnas'>
                  <div>
                    <Chofer
          
                    >
                    </Chofer>
                  </div>
                  <div>
                    <Motohormigonera
                
                    >
                    </Motohormigonera>
                  </div>
                </div>
              ) :
              <PDF
              
              >
              </PDF>
      }
    </div>
  )
}







export default Layout