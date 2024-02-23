import React from 'react';
import {useNavigate} from "react-router-dom";
// images
import LoginImg from '../assets/login.png';
import logo from '../assets/logo.png';

function Login() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className='login-container'>
            <div className='logo-container' style={{padding: 0, margin: 0}}>
                <img src={logo} width='32px' alt='logo' style={{ borderRadius: '20px', marginRight: '5px' }} />
                <h3>Infigo Media</h3>
            </div>
            <h1>Login</h1>
            <img src={LoginImg} width='500px'/>
            <input className='login-input' type='text' placeholder='Username'/>
            <input className='login-input' type='password' placeholder='Password'/>
            <button onClick={handleClick} className='loginBtn'>Login</button>
        </div>
    )
}

export default Login
