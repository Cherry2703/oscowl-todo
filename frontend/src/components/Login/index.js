// src/components/Login.js
import React, { useState } from 'react';


import { Container,FormWrapper,Input,Title,Button } from './styled';

import { useNavigate,Link } from 'react-router-dom';

import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg]=useState('')
    const navigate=useNavigate()

    const handleLogin = async(e) => {
      e.preventDefault();
      const options={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({username,password})
      }
      try {
        const res=await fetch('https://oscowl-todo.onrender.com/login',options)
        const data=await res.json()
        console.log(data);
        
        if(res.ok===true){
            Cookies.set("jwtToken",data.jwtToken,{expires:30,path:'/'})
            setErrorMsg('You have succesfully logged in redirecting to home age in 5 seconds')
            setTimeout(()=>{
                navigate('/')
            },5000)
        }else{
            setErrorMsg('Inavalid Credentials please type valid credentials.')
        }
      } catch (error) {
        setErrorMsg('Inavalid Credentials please type valid credentials.');
        console.error('Login error:', error);
      }
    };
  
    return (
      <Container>
        <FormWrapper>
          <Title>Login to Your Account</Title>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
          </form>
          <Link to='/signup' className='create-new-account-text'>Create New Account</Link>
          <p>{errorMsg}</p>
        </FormWrapper>
      </Container>
    );
  };
  
  export default Login;