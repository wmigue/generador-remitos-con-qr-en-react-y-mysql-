
import { useContexto } from "../contexts/context"

const styles = {
    show: {
        visibility: 'visible',
    },
    dontshow: {
        visibility: 'hidden',
    }
}


const Boton = (props) => {

    const {vista, setVista, selectClientesChanged} = useContexto()
    const{texto,clase}=props

    const handleShowSiguiente = () => {
        if (selectClientesChanged.cliente !== '' && selectClientesChanged.obra.nombre !== '' && vista === 1) {
            return true
        } else if (selectClientesChanged.dosificacion.tipo !== 'seleccionar DOSIFICACION' && selectClientesChanged.dosificacion.m3 > 0 && vista === 2) {
            return true
        } else if (selectClientesChanged.chofer.nombre !== '' && selectClientesChanged.mh.patente!== '' && vista === 3) {
            return true
        } else {
            return false
        }
    }


    const handleShowAtras = () => {
        if (vista > 1) {
            return true
        }
    }


    const handleClick = () => {
        if (texto === 'Atras') {
            if (vista > 1) {
                setVista(vista - 1)
            }
        } else if (texto === 'Siguiente') {
            //if (vista < 3) {
            setVista(vista + 1)
            //}
        }
    }

    console.log("se renderiza boton")

    return (
        <button
            onClick={handleClick}
            className={clase}
            style={
                vista === 4 && texto === 'Atras' ? styles.dontshow :
                    handleShowAtras() && texto === 'Atras' ? styles.show :
                        handleShowSiguiente() && texto === 'Siguiente' ? styles.show :
                            styles.dontshow
            }
        >
            {texto}
        </button>
    )
}





export default Boton