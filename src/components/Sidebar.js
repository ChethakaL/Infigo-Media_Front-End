import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdSpaceDashboard, MdArticle } from "react-icons/md";
import { FaProductHunt, FaPlus, FaEye } from 'react-icons/fa'; // Importing icons
import '../App.css';
import logo from '../assets/logo.png';
import {FaRegMessage} from "react-icons/fa6";
import {BiCustomize} from "react-icons/bi";

const Sidebar = () => {
    const [isProductMenuOpen, setProductMenuOpen] = useState(false);

    const toggleProductMenu = () => {
        setProductMenuOpen(!isProductMenuOpen);
    };

    return (
        <div className="sidebar" style={{ backgroundColor: '#071821', color: '#FFFFFF' }}>
            <div className='logo-container' style={{alignItems: 'center'}}>
                <img src={logo} width='32px' alt='logo' style={{ borderRadius: '20px', marginRight: '5px'}} />
                <h3 style={{margin:0, padding: 0}}>Infigo Media</h3>
            </div>
            <ul className="sidebarMenu">
                <li className="sidebarItem">
                    <Link to="/" className="sidebarLink">< MdSpaceDashboard
                        style={{marginRight: '10px'}}/> Dashboard</Link>
                </li>
                <li className="sidebarItem">
                    <button onClick={toggleProductMenu} className="menuButton"><FaProductHunt
                        style={{marginRight: '10px'}}/> Product
                    </button>
                    <div className={`submenu ${isProductMenuOpen ? 'open' : ''}`}>
                        <Link to="/product/add" className="sidebarSubLink"><FaPlus
                            style={{marginRight: '10px'}}/> Add</Link>
                        <Link to="/product/manage" className="sidebarSubLink"><FaEye
                            style={{marginRight: '10px'}}/> Manage</Link>
                    </div>
                </li>
                <li className="sidebarItem">
                    <Link to="/message" className="sidebarLink">< FaRegMessage
                        style={{marginRight: '10px'}}/> Message</Link>
                </li>
                <li className="sidebarItem">
                    <Link to="/content" className="sidebarLink"><MdArticle
                        style={{marginRight: '10px'}}/> Content</Link>
                </li>
                <li className="sidebarItem">
                    <Link to="/content" className="sidebarLink"><BiCustomize
                        style={{marginRight: '10px'}}/> Customize</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
