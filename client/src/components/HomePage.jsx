/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'mongoose';

const HomePage = (props) => {
    const {socket, setIsconnected, username} = props;
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState('');

    const getData = async () => {
        await axios.get('http://localhost:8000/api/users', {withCredentials: true})
            .then((res) => {
                console.log("Line 11 - ",res.data);
                console.log("Line 12 - ",res.data);

            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            })
    }


    useEffect(() => {

        socket.on('new user', (data) => {
            console.log(data);
            setUsers(data.users);
            setMessages(data.messages);
        })
        socket.on('new message', (data) => {
            console.log(data);
            setMessages(data);
        })
    }, [setMessages, socket, setUsers])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        socket.emit('send message', {username, message: input});
        setInput('');
    }


    return (
        <div className="w-75 text-center">
            <h1>Fayettevilles Posts</h1>
            <div className="d-flex justify-content-center">
                <div className="w-50">
                    {
                        messages.map((message, i) => {
                            return <p key={i}>{message.username}: {message.message}</p>
                        })
                    }
                    <form onSubmit={onSubmitHandler}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage