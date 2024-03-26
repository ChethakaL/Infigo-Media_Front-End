import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import Axios for making HTTP requests
// images
import LoginImg from '../assets/login.png';
import logo from '../assets/logo.png';
import {ToastContainer,toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClick = async () => {
        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/user/login', { email, password });
            // const response = await axios.post('http://localhost:4001/backend/api/user/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store the token in local storage
            toast.success('Successfully logged in')
            navigate("/");
        } catch (error) {
            setError('Invalid username or password');
            console.log('email, password', email,password);
        }
    }

    return (
        <div className='login-container'>
            <div className='logo-container' style={{ padding: 0, margin: 0 }}>
                <img src={logo} width='32px' alt='logo' style={{ borderRadius: '20px', marginRight: '5px' }} />
                <h3 style={{ margin: 0 }}>Infigo Media</h3>
            </div>
            <h1>Login</h1>
            <img src={LoginImg} width='500px' alt="login image" />
            <input
                className='login-input'
                type='text'
                placeholder='Username'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='login-input'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleClick} className='loginBtn'>Login</button>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}/>
        </div>
    )
}

export default Login;
