import React, { useContext, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../Auth'
import { auth } from '../../components/config/firebase'

import logo from '../../assets/bookshelfio.svg'

import './SignUp.css'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [display, setDisplay] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const { user } = useContext(UserContext);

    if(user){
        return <Redirect to="/shelf"/> 
    }

    async function signUpUser(email, password, display){
        try{
            const response = await auth.createUserWithEmailAndPassword(email, password);
            await response.user.updateProfile({ displayName: display})
        } catch(err){
            alert(err.message)
        }
    }

    const handleSignup = (e) => {
        e.preventDefault()
        email.trim()
        password.trim()
        if(email !== '' && display !== '' && password !== '' && verifyPassword !== ''){
            if(password === verifyPassword){
                signUpUser(email, password, display)
            } else{
                alert('The passwords do not match')
            }
        } else{
            alert('Please enter something in these fields')
        }
    }

    return(
        <div className="signup">
            <img src={logo} alt="bookshelf.io" />

            <h3>Welcome to BookShelf.io</h3>
            <p className="login-link">Already have an account? <Link to="/login"><span>Login.</span></Link></p>

            <form onSubmit={handleSignup}>
                <p>Email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <p>Display Name</p>
                <input type="text" value={display} onChange={(e) => setDisplay(e.target.value)}/>

                <p>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <p>Verify Password</p>
                <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}/>

                <button>Create Account</button>
            </form>
        </div>
    )
}

export default SignUp;