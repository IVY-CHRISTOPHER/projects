import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

/* eslint-disable react/prop-types */

const EventsPage = (props) => {
    const {events, setEvents} = props;

    const getData = async () => {
        await axios.get('http://localhost:8000/api/events', {withCredentials: true})
            .then((res)=>{
                setEvents(res.data);
                console.log(res.data);
            })
            .catch((err) =>{
                console.log(err);
                console.log(err.response);
            })
        }
        console.log("Events State - ",events)
    useEffect(() => {
        getData();
    }, [])

    return (
        <div style={{
            height: "500px",
            width: "75%",
            margin: "auto",
            }} className="border border-white overflow-auto">
            <div className="d-flex justify-content-between align-items-center p-2">
            <h1 className="align-items-center  m-auto">Fayetteville's Events</h1>
            <Link className="text-align-right btn text-white border border-primary" 
            onMouseLeave={(e) => {e.target.className = "text-align-right btn text-white border border-primary"}} 
            onMouseOver={(e) => {e.target.className = "text-align-right btn text-primary border border-0"}} 
            to={'/createEvent'}>Create an Event</Link>
            </div>
            <hr/>
            <div>
                <div>
                    {
                        events && events.map((event, index) => (
                            <div key={index} className="p-3 d-block">
                                <div className="text-center border border-white p-2 bg-dark">
                                    <p>{event.User_Name}</p>
                                    <p>{event.createdAt}</p>
                                </div>
                                <div className="text-center border border-whited p-2 bg-secondary">
                                    <Link to={"#"} className="text-decoration-none text-white">
                                        <h5>Event: {event.name}</h5>
                                    </Link>
                                    <p>Description: {event.description}</p>
                                    <p>Location: {event.where}</p>
                                    <p>Date: {event.date}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EventsPage