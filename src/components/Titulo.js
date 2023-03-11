
const Titulo = ({ children })=>{
    return (
        <b style={estilo}>{children}</b>
    )
}

const estilo = {
    transform : 'scale(3)',
    fontSize: ' 20px',
    color: 'rgb(202, 202, 202)',
    paddingRight: '20px'


}

export default Titulo