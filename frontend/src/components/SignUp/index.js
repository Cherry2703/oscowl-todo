// // src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Container,FormWrapper,Title,Input,Button,Message} from './styled'
import './index.css'


const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
  
    const handleSignup = async(e) => {
      e.preventDefault();
  
      // Simple form validation
      if (!email || !username || !password) {
        setError(true);
        setMessage('All fields are required.');
        return;
      }
  
      if (password.length < 8) {
        setError(true);
        setMessage('Password must be at least 8 characters long.');
        return;
      }else{
        const options={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,email,password}),
        }
        const res=await fetch('https://oscowl-todo.onrender.com/signup', options)
        const data= await res.json()
        console.log(data);
        
      }
  
      // Simulate a successful sign-up process
      setError(false);
      setMessage('Signup successful! Redirecting to login page...');
      
      // Redirect after a brief delay
      setTimeout(() => {
        navigate('/login');
      }, 5000); // 5-second delay for user to see the message
    };
  
    return (
      <Container>
        <FormWrapper>
          <Title>Create an Account</Title>
          <form onSubmit={handleSignup}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <Button type="submit">Sign Up</Button>
          </form>
          {message && <Message error={error}>{message}</Message>}
          <Link to="/login" className='login-link'>Already have an account? Log in</Link>
        </FormWrapper>
      </Container>
    );
  };
  
  export default Signup;


