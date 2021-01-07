import React from 'react'

//router 
import { Link } from 'react-router-dom'

//image import
import logo from '../../assets/bookshelfio.svg'

import './navigation.css' 

const Navigation = () => {
    return(
        <div className="navigation">
            <nav>
                <div className="logo">
                    <img src={logo} alt="BookShelf.io logo"/>
                </div>
                <div>
                    <ul>
                        <Link to="/login" className="link">
                            <li className="login">Login</li>
                        </Link>
                        <Link to="/login" className="link">
                            <li className="sign-up">Get Started</li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navigation