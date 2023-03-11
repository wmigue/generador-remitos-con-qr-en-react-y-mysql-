
import Dosificacion from "./Dosificacion"
import Titulo from "./Titulo"

const Check = (props) => {

    const { setSelectClientesChanged, selectClientesChanged } = props

    const handleChecked = (e) => {
        if (props) {
            //logica si me pasan argumentos
            e.target.checked === true ?
                setSelectClientesChanged({
                    ...selectClientesChanged,
                    dosificacion: { ...selectClientesChanged.dosificacion, bomba: true }
                }) :
                setSelectClientesChanged({
                    ...selectClientesChanged,
                    dosificacion: { ...selectClientesChanged.dosificacion, bomba: false }
                })
        } else {
            console.log(e.target.checked)
        }
    }

    return (
        <div>
            <Titulo>Intalación de BOMBA</Titulo>
            <input type="checkbox" style={estilo} checked={selectClientesChanged.dosificacion.bomba} onChange={handleChecked} />
        </div>
    )
}

const estilo = {
    transform: 'scale(3)'
}

export default Check