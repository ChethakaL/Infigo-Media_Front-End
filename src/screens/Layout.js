import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom"

//Components
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
function Layout() {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <div className='layout-container'>
                <div className='sidebar-main'>
                    <Sidebar/>
                </div>
                <div className='main-content'>
                    <div className='header-main'>
                        <Header/>
                    </div>
                    <div className='main-container'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <div className='footer'>
            </div>
        </div>
    )
}

export default Layout
