import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            Navigator('/');
        }
    })

    const collection = async () => {
        console.log(name, email, password);
        let result = await fetch('http://localhost:7000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result);
        if (result) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        }
    }

    return (
        <div className='signup'>
            <h1>Registered</h1>
            <input className="inputbox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Username' />
            <input className="inputbox" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className="inputbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button className='btn' onClick={collection} type='button'>Registered</button>

        </div>
    )
}

export default SignUp;