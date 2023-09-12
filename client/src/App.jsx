import './App.css'
import Register from './components/Register'
import Main from './views/Main'
import Login from './components/Login'
import Events from './views/Events'
import EventsCreation from './components/EventsCreation'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import io from 'socket.io-client'

const App = () => {
  const [events, setEvents] = useState([]);
  const [socket] = useState(() => io(':8000'));
  const [isconnected, setIsconnected] = useState(socket.connected);
  const [username, setUsername] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<Login username={username} setUsername={setUsername} socket={socket} isconnected={isconnected} setIsconnected={setIsconnected} />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/homepage" element={<Main username={username} socket={socket} isconnected={isconnected} setIsconnected={setIsconnected} events={events} setEvents={setEvents}/>}/>
        <Route path="/events" element={<Events events={events} setEvents={setEvents}/>} />
        <Route path="/createEvent"  element={<EventsCreation events={events} setEvents={setEvents}/>} />
      </Routes>
    </>
  )
}

export default App
