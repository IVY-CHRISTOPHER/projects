import NavBar from "../components/NavBar";
import HomePage from "../components/HomePage";
import EventsBar from "../components/EventsBar";

const Main = (props) => {
    const {events, setEvents, socket, setIsconnected, username, setUsername} = props;

    return (
        <>
        <NavBar />
        <div className="d-flex">
        <div className="w-75">
            <HomePage username={username} setUsername={setUsername} socket={socket} setIsconnected={setIsconnected} />
        </div>
        <div className="w-25">
            <EventsBar events= {events} setEvents={setEvents}/>
        </div>
        </div>
        </>
    );
};

export default Main;