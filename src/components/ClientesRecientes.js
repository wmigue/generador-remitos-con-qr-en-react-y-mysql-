import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Titulo from './Titulo'
import { useContexto } from '../contexts/context'


function ClientesRecientes(props) {

  const{setSelectClientesChanged, selectClientesChanged}=useContexto()

  //const { setSelectClientesChanged, selectClientesChanged } = props
  const recientes = selectClientesChanged.recientes

  const handleChange = (e) => {
    setSelectClientesChanged({ ...selectClientesChanged, cliente: e.target.innerText })
  }

  

  return (
    <>
      {
        recientes.length > 0 ?
          (
            <Card>
              <Card.Header>
                <Titulo>Clientes Recientes</Titulo>
              </Card.Header>
              <ListGroup variant="flush">
                {
                  recientes.map(x =>
                    <ListGroup.Item
                      action variant="light"
                      value={x}
                      onClick={handleChange}>
                      {x}
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card>
          ) : null
      }
    </>
  )
}


export default ClientesRecientes