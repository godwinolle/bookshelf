import React, { useState } from 'react'


//icons from react-icon dependency
import { FaSearch } from 'react-icons/fa'

//importing of image
import landing from '../../assets/landing.svg'

import './tagline.css'


const Tagline = () => {
    const [book, setBook] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(book)
    }

    
    return(
        <div className="tagline">
            <div className="explore">
                <h1>Explore Your Mind.</h1>
                <p>
                    The more that you read, the more things you will know. 
                    The more that you learn, the more places you’ll go. 
                    —Dr. Seuss
                </p>
                <form onSubmit={handleSubmit}>
                    <label><FaSearch /></label>
                    <input placeholder="Search For A Good Read"
                    value={book} onChange={(e) => setBook(e.target.value)}
                    />
                </form>
            </div>
            <div>
                <img src={landing} alt="welcome to bookshelf.io" />
            </div>
        </div>
    )
}

export default Tagline;