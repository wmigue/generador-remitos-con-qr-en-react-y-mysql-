import { useRef } from "react"

const Login = ({ setAuth }) => {

    const passref = useRef('')

    const handleClick = () => {
        const pass = passref.current.value
        const url = process.env.REACT_APP_SINGLETON_NOW + process.env.REACT_APP_AUTH
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pass: pass })
        })
            .then(x => x.json())
            .then(x => {
                setAuth(x.datos)
            })
    }


    return (
        <div className="container w-25 d-flex justify-content-center">
            <input
                ref={passref}
                type="password"
                class="form-control m-3"
                id="examplePassword1"
                placeholder="Password"
            />
            <button className="btn btn-primary m-3" onClick={handleClick}>
                entrar
            </button>

        </div>
    )
}

export default Login