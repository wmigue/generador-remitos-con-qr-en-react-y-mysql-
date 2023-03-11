import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import saveLog from '../hooks/useSaveLog'
import QRCode from "react-qr-code"
import logo from "../assets/logo2.jpg"
import r from "../assets/R.jpg"
import useMoreData from '../hooks/useMoreData'
import { useContexto } from "../contexts/context"

const PDF = () => {

    const { setVista, selectClientesChanged } = useContexto()

    const [clickPrint, setClickPrint] = useState(0)
    const [rehacer, setRehacer] = useState(0)
    const [numero, setNumero] = useState(0)
    const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_CLIENTE_ALL_DATA
    const url2 = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_REMITO_NUMERACION
    const url3 = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_SAVE_REMITO_DB
    const { data } = useMoreData(url, selectClientesChanged.cliente)


    const qr_data = `
        cliente: ${selectClientesChanged.cliente}
        obra: ${selectClientesChanged.obra.direccion}
        dosificacion: ${selectClientesChanged.dosificacion.tipo + ': ' + selectClientesChanged.dosificacion.m3 + ' M3'}
        chofer: ${selectClientesChanged.chofer.nombre}
        mh: ${selectClientesChanged.mh.patente}
    `

    const json_data = Object.assign({}, selectClientesChanged)
    delete json_data.motohormigoneras
    delete json_data.todos
    delete json_data.recientes
    delete json_data.formulas
    delete json_data.formulasRecientes
    delete json_data.choferRecientes
    delete json_data.choferTodos

    const getMaxRemito = async () => {
        fetch(url2).then(x => x.text()).then(x => setNumero(x))
    }

    const saveRemitoDB = () => {
        const fecha = new Date().toLocaleString()
        fetch(url3, {
            method: 'POST',
            body: JSON.stringify({ fecha: fecha, json_data: json_data }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(x => x.text()).then(x => console.log(x))
    }


    const esconderBotones = async () => {
        await setClickPrint(1)
    }

    const Imprimir = () => {
        if (window.confirm('confirma impresión???')) {
            esconderBotones().then(x => {
                saveLog(json_data, nombre_fichero)
                saveRemitoDB()
                window.print()
            }).then(x => setRehacer(1))
        } else {

        }
    }

    const volverAlInicio = () => {
        setVista(1)
    }


    const fecha = new Date().toLocaleString()
    const nombre_fichero = selectClientesChanged.cliente + " " + fecha + ".txt"
    const dosificacion = selectClientesChanged.dosificacion
    const chofer = selectClientesChanged.chofer
    const cliente = selectClientesChanged.cliente
    const mh = selectClientesChanged.mh
    getMaxRemito()
    const referencia = numero ? "REMITO Nº:  " + numero : null



    return (
        <>
            <div className='centrame2'>
                {
                    !clickPrint && numero ? (
                        <button
                            className={clickPrint ? 'esconder' : 'imprimir'}
                            onClick={() => Imprimir()}
                        >
                            Imprimir
                        </button>
                    ) : null
                }

                <button
                    className={clickPrint && !rehacer ? 'esconder' : 'rehacer'}
                    onClick={volverAlInicio}
                >
                    Rehacer
                </button>
            </div>

            <div className="remito">
                <div className="header">
                    <div className="centrame">
                        <div>
                            <img src={logo} width={200} alt="logo"></img><br />
                        </div>
                        <p className='inicioact maspaddingtop2'>
                            <b>Ausberto Ortiz 3820 - Parque industrial Formosa</b><br />
                            <b>0370 50 333 50</b><br />
                            <b>(3600) Formosa </b>
                        </p>
                    </div>
                    <div className="centrame">
                        <img src={r} width={100} alt="logo"></img>
                    </div>
                    <div className="centrame">
                        <b>{referencia} </b>
                        <p>{fecha}</p>
                        <p className='inicioact'>
                            C.U.I.T. Nº: 20-22486722-1 <br />
                            ATP Nº: 20-22486722-1 <br />
                            INIC. ACTIVIDADES: 21 de mayo de 2002
                        </p>
                    </div>
                </div>
                <div className="body">
                    <div>
                        <Table size="sm" h-25>
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{"CLIENTE / CUIT"}</td>
                                    <td>{cliente}{" ( "}{data[0] ? data[0].cuit : null}{" )"}</td>
                                </tr>
                                <tr>
                                    <td>{"EMAIL"}</td>
                                    <td>{data[0] ? data[0].email : null}</td>
                                </tr>
                                <tr>
                                    <td>{"TELEFONO"}</td>
                                    <td>{data[0] ? data[0].telefono : null}</td>
                                </tr>
                                <tr>
                                    <td>{"DIRECCION FISCAL"}</td>
                                    <td>{data[0] ? data[0].direccion : null}</td>
                                </tr>
                                <tr>
                                    <td>{"DIRECCION DE OBRA"}</td>
                                    <td>{selectClientesChanged.obra.nombre + " " + selectClientesChanged.obra.direccion}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div><br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>M³</th>
                                    <th>Producto</th>
                                    <th>Bombeo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{dosificacion.m3}</td>
                                    <td>{dosificacion.tipo}</td>
                                    <td>{dosificacion.bomba === true ? "SI" : "NO"}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className=' firmas '>
                        <div>
                            Firma __________________________________________
                        </div>
                        <div>
                            Aclaración __________________________________________
                        </div>
                    </div>
                </div>
                <div className='horas'>
                    <div className="rightame maspaddingright">
                        <b>{referencia}</b>
                    </div>
                    <div className='firmas maspaddingtop2 maspaddingbottom'>
                        <div>
                            {"Agregado en obra bajo responsabilidad del director o encargado (firma)"}<br /><br /><br />
                            {" __________________________ "}
                        </div>
                        <div>
                            {"Agua (cant.) "}<br /><br /><br />
                            {" __________________________ "}
                        </div>
                        <div>
                            {"Otro (cant.)"}<br /><br /><br />
                            {" __________________________ "}
                        </div>
                        <div>
                            {"Presinto N° "}<br /><br /><br />
                            {" __________________________ "}
                        </div>
                    </div>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>hora carga</th>
                                    <th>salida planta</th>
                                    <th>llegada obra</th>
                                    <th>inicio descarga</th>
                                    <th>fin descarga</th>
                                    <th>llegada planta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fecha}</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                    <td>{ }</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='firmas fondosombra'>
                            <div>
                                <b>Chofer:</b> {chofer.nombre}
                            </div>
                            <div>
                                <b>Patente camión:</b> {mh.patente}
                            </div>
                            <div>
                                <b>Modelo: </b> {mh.modelo}
                            </div>
                            <div className="qr">
                                <QRCode value={qr_data} size={75}></QRCode>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer alignLeft">

                </div>
            </div>
        </>
    )
}

export default PDF
