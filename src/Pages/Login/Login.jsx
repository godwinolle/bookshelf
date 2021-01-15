import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../Auth'
import { auth } from '../../components/config/firebase'

import logo from '../../assets/bookshelfio.svg'

import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user } = useContext(UserContext);

    if(user){
        return <Redirect to="/shelf"/> 
    }

    async function loginUser(email, password){
        try{
            await auth.signInWithEmailAndPassword(email, password);
        } catch(err){
            alert(err.message)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        email.trim()
        password.trim()
        if(email !== '' && password !== ''){
            loginUser(email, password)
        } else{
            alert('Please enter something in these fields')
        }
    }

    return(
        <div className="login">
            <img src={logo} alt="bookshelf.io" />

            <h3>Welcome to BookShelf.io</h3>
            <p className="signup-link">New here? <Link to="/register"><span>Create an account.</span></Link></p>

            <form onSubmit={handleLogin}>
                <p>Email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <p>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default Login;