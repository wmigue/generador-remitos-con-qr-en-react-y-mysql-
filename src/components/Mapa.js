const Mapa = ({ direccion }) => {

    return (

        <div className="container m-5">
            <iframe width="500"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                src={direccion}
            >
            </iframe>
        </div>
    )

}

export default Mapa