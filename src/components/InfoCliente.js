import { useParams } from 'react-router-dom'
import Mapa from './Mapa'

const InfoCliente = () => {
  
  const API_KEY2 = 'AIzaSyAIL8r1EkGRKKZ5I-wZCdXewi80CSEiqXk'
  const urlMapa = "https://www.google.com/maps/embed/v1/place?key=" + API_KEY2 + "&q="
  const { id } = useParams()

  return (
    <>
      <div>
        <Mapa
         direccion={urlMapa+id}
        >

        </Mapa>
      </div>
    </>
  )
}
export default InfoCliente