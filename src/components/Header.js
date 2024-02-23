import React from 'react'
import { RiNotification3Line } from "react-icons/ri";

function Header() {
    return (
        <div className='header-container' style={{alignItems: 'center'}}>
            <h2 style={{padding:0, margin:0}}>Infigo Media</h2>
            <div className='header-icon-container'>
                <RiNotification3Line size={25} style={{marginRight:'10px'}}/>
                <div className='circle'></div>
            </div>
        </div>
    )
}

export default Header
