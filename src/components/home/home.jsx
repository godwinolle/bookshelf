import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../Auth'
import {auth} from '../config/firebase'

const style = {
    display: 'none'
}
const Home = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState();
    const [userStatus, setUserStatus] = useState(true);

    const { user } = useContext(UserContext);

    if(user){
        return <Redirect to="/shelf"/> 
    }
    
    const newUser = () => { //this changes if user wants to create an account
        setUserStatus(false)
    }

    async function loginUser(email, password){
        try{
            const response = await auth.signInWithEmailAndPassword(email, password);
            console.log(response)
        } catch(err){
            alert(err.message)
        }
    }
    async function signUpUser(email, password, display){
        try{
            const response = await auth.createUserWithEmailAndPassword(email, password);
            await response.user.updateProfile({ displayName: display})
            console.log(response);
        } catch(err){
            alert(err.message)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        email.trim()
        password.trim()
        if(email !== '' && password !== ''){
            console.log('Trying to login')
            loginUser(email, password)
        } else{
            alert('Please enter something in these fields')
        }
    }

    const handleSignup = (e) => {
        e.preventDefault()
        email.trim()
        password.trim()
        if(email !== '' && password !== ''){
            console.log('Trying to signup')
            signUpUser(email, password, displayName)
        } else{
            alert('Please enter something in these fields')
        }
    }
    return(
        <div className="home">
            <h1>Book Shelf</h1>
            <div className="container">
                <form className="login-signup" onSubmit={userStatus ? handleLogin: handleSignup}>
                    <p>Email</p>
                    <input type="text" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    <p>Password</p>
                    <input type="password" value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    {
                        userStatus ? 
                        <div>
                            <p style={style}>Display Name</p>
                            <input type="text" value={displayName} style={style}
                            onChange={(e) => {
                                setDisplayName(e.target.value)
                            }}/>
                        </div> : 
                        <div>
                            <p>Display Name</p>
                            <input type="text" value={displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value)
                            }}/>
                        </div>
                    }
                    <br />
                    {userStatus ? <button>Login</button> : <button>Signup</button>}
                    <p className="signup">Don't have an account? <span onClick={() => newUser()}>Signup</span></p>
                </form>
            </div>
        </div>
    )
}

export default Home;
