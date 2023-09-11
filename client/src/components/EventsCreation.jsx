import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EventsCreation = (props) => {
    const navigate = useNavigate()
    const {events, setEvents} = props;

    const [form, setForm] = useState({
        name: "",
        description: "",
        date: "",
        where: "",
    })

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Front End - form -",form);
        axios.post("http://localhost:8000/api/events", form, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/events')
                setEvents([...events, form])
                console.log("Front End - events -",events);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            })
    }

    return (
        <>
        <div className="text-center m-2">
            <h1>Events Creation</h1>
            <Link to={'/events'}>Back to Events</Link>
        </div>
        <div>
            <form onSubmit={submitHandler} className="w-50 mx-auto">
                <div className="form-group">
                    <label>Event Name:</label>
                    <input type="text" onChange={changeHandler} className="form-control" name="name"/>
                    {
                        form.name.length < 3 && form.name.length !== 0 ?
                        <p className="text-danger">Name must be at least 3 characters</p> :
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" onChange={changeHandler} className="form-control" name="description" />
                    {
                        form.description.length < 3 && form.description.length !== 0 ?
                        <p className="text-danger">Description must be at least 3 characters</p> :
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>When:</label>
                    <input type="date" onChange={changeHandler} className="form-control" name="date" />
                    {
                        form.date.length < 1 && form.date.length !== 0 ?
                        <p className="text-danger">Date must be at least 1 character</p> :
                        ""
                    }
                </div>
                <div className="form-group">
                    <label>Where:</label>
                    <input type="text" onChange={changeHandler} className="form-control" name="where" />
                    {
                        form.where.length < 3 && form.where.length !== 0 ?
                        <p className="text-danger">Where must be at least 3 characters</p> :
                        ""
                    }
                </div>
                <div className="d-flex">
                {
                    form.name.length < 3 || form.description.length < 3 || form.date.length < 1 || form.where.length < 3 ?
                    <input type="submit" value="Create Event" className="btn btn-primary mt-2" disabled/> :
                    <input type="submit" value="Create Event" className="btn btn-primary mt-2"/>
                }
                </div>
            </form>
                
        </div>
        </>
        )
}

export default EventsCreation