import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import EventsBar from "../components/EventsBar";

const Main = (props) => {
    const {events, setEvents} = props;

    return (
        <>
        <NavBar />
        <div className="d-flex">
        <div className="w-75">
            <HomePage />
        </div>
        <div className="w-25">
            <EventsBar events={events} setEvents={setEvents}/>
        </div>
        </div>
        </>
    );
    }

    

export default Main;