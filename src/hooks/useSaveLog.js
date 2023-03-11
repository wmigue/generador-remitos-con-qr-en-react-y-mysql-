import { saveAs } from 'file-saver'

//guarda en un txt el json del remito generado.
const saveLog = (obj, nombreFichero) => {
    var blob = new Blob([JSON.stringify(obj)], { type: "text/plain;charset=utf-8" })
    saveAs(blob, nombreFichero)
}
export default saveLog