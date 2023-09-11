import EventsPage from "../components/EventsPage";
import NavBar from "../components/NavBar";

import React, {useState} from "react";

const Events = (props) => {
    const {events, setEvents} = props;
    console.log("Main Page Events State - ",events);
    return (
        <div>
            <NavBar />
            <EventsPage events={events} setEvents={setEvents}/>
        </div>
    )
}

export default Events