import {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const changeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register", user, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/')
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
            <form className="w-50 mx-auto" onSubmit={submitHandler}>
                <div>
                    <label className="form-label">First Name: </label>
                    <input className="form-control" type="text" name="firstName" value={user.firstName} onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Last Name: </label>
                    <input className="form-control" type="text" name="lastName" value={user.lastName} onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Email: </label>
                    <input className="form-control" type="email" name="email" value={user.email} onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Password: </label>
                    <input className="form-control" type="password" name="password" value={user.password} onChange={changeHandler}/>
                </div>
                <div>
                    <label className="form-label">Confirm Password: </label>
                    <input className="form-control" type="password" name="confirmPassword" value={user.confirmPassword} onChange={changeHandler}/>
                </div>
            <div className="text-center mt-3">
                <button className="btn btn-primary" type="submit">Register</button>
                <div style={{
                    gap: '5px'
                }} className="d-flex justify-content-center">
                <p>Already Have an Account?</p>
                <Link to="/">Log-In</Link>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Register