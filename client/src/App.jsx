import './App.css'
import Register from './components/Register'
import Main from './views/Main'
import Login from './components/Login'
import Events from './views/Events'
import EventsCreation from './components/EventsCreation'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
  const [events, setEvents] = useState([]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/homepage" element={<Main events={events} setEvents={setEvents}/>}/>
        <Route path="/events" element={<Events events={events} setEvents={setEvents}/>} />
        <Route path="/createEvent"  element={<EventsCreation events={events} setEvents={setEvents}/>} />
      </Routes>
    </>
  )
}

export default App
