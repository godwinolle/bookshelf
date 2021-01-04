import React, { useState, useEffect, createContext } from 'react'
import { auth } from './components/config/firebase'

export const UserContext = createContext()
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            setUser(userAuth);
        })
    }, [])

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider