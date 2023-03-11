import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Titulo from './Titulo'
import { useContexto } from "../contexts/context"


function FormolasRecientes(props) {

  const {setSelectClientesChanged, selectClientesChanged} = useContexto()

  //const { setSelectClientesChanged, selectClientesChanged } = props
  const recientes = selectClientesChanged.formulasRecientes

  const handleChange = (e) => {
    const id = e.target.getAttribute('id')
    const dosificacion = {...selectClientesChanged.dosificacion, id: id, tipo: e.target.value, m3: selectClientesChanged.dosificacion.m3 }
    setSelectClientesChanged({
      ...selectClientesChanged,
      dosificacion: dosificacion
    })
  }

  return (
    <>
      {
        recientes.length > 0 ?
          (
            <Card>
              <Card.Header>
                <Titulo>Formulas Recientes</Titulo>
              </Card.Header>
              <ListGroup variant="flush">
                {
                  recientes.map(x =>
                    <ListGroup.Item action variant="light" value={x.tipo} id={x.id} onClick={handleChange}> {x.tipo} </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card>


          ) : null
      }
    </>
  )
}


export default FormolasRecientes