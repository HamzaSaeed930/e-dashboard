import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin =async () => {
    console.log("email,password",setEmail, setPassword);
    let result = await fetch('http://localhost:7000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'//agr kuj alg sa header bejna hw tu backend developer bta deta h otherwise ak hi header hota jo a content type hota
      }
    });
    result = await result.json()
        console.log(result);
        if(result.name)
        {
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
        }
        else{
          alert("please enter valid email address")
        }
  }

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth)
    {
        Navigator('/');
    }
},[])

  return (
    <div className='login'>
      <h1>Login Page</h1>
      <input className="inputbox" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
      <input className="inputbox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
      <button className='btn' onClick={handleLogin} type='button'>Login</button>

    </div>
  )
}

export default Login