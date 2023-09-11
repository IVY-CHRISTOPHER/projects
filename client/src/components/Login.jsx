import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    const changeHandler = (e) => {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", userLogin, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/homepage')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className="p-2">
            <h1>Logo</h1>
            <h1 className="text-center mt-2 fixed-top">TownSquareConnect</h1>
            <hr />
            </div>
            <h1 className="text-center">Login</h1>
            <form className="w-50 mx-auto" onSubmit={submitHandler}>
                <div>
                    <label className="form-label">Email: </label>
                    <input className="form-control" type="email" name="email" value={userLogin.email} onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Password: </label>
                    <input className="form-control" type="password" name="password" value={userLogin.password} onChange={changeHandler}/>
                </div>
            <div className="text-center mt-3">
                <button className="btn btn-primary" type="submit">Login</button>
                <div style={{
                    gap: '5px'
                }} className="d-flex justify-content-center">
                <p>Dont have an account?</p>
                <Link to="/register">Sign Up</Link>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Login