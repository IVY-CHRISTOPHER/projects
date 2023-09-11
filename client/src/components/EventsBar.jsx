import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import React from 'react';

/* eslint-disable react/prop-types */

const EventsBar = (props) => {
    const {events, setEvents} = props;
    
    const getData = async () => {
        await axios.get('http://localhost:8000/api/events', {withCredentials: true})
            .then((res)=>{
                // console.log("Response: ")
                // console.log(res.data);
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
        <>
        <div>
            <h3 className='text-center'>Nearby Events</h3>
            <div style={{
                height: "500px",
            }} className="text-center border border-white overflow-auto">
                <hr/>
                {
                    events && events.map((event, index) => (
                        <div key={index}>
                            <Link to={`/events`} className="text-decoration-none text-dark">
                                <h5>{event.name}</h5>
                            </Link>
                            <p>{event.location}</p>
                            <p>{event.date}</p>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default EventsBar