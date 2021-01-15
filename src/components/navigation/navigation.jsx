import React, { useState } from 'react'

//router 
import { Link } from 'react-router-dom'

//image import
import logo from '../../assets/bookshelfio.svg'

import './navigation.css' 

const Navigation = () => {
    const [toggle, setToggle] = useState(false);

    const onToggle = () => {
        setToggle(!toggle);
    }

    if(toggle){
        return(
            <div className="toggleMenu">
                <ul>
                    <Link to="/login" className="link">
                        <li className="login-link">Login</li>
                    </Link>
                    <Link to="/register" className="link">
                        <li className="sign-up">Create an Account</li>
                    </Link>
                </ul>
                <div className="close" onClick={()=> onToggle()}>CLOSE</div>
            </div>
        )
    }

    
    return(
        <div className="navigation">
            <nav>
                <div className="logo">
                    <img src={logo} alt="BookShelf.io logo"/>
                </div>
                <div>
                    <ul>
                        <Link to="/login" className="link">
                            <li className="login-link">Login</li>
                        </Link>
                        <Link to="/register" className="link">
                            <li className="sign-up">Get Started</li>
                        </Link>
                    </ul>
                </div>
                <div className="hamburger" onClick={() => onToggle()}>
                    <div className="line top"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>              
            </nav>
        </div>
    )
}

export default Navigation