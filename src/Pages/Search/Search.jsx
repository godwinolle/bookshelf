import React, { useState } from 'react';
import { useEffect } from 'react';

//icons from react-icon dependency
import { FaSearch } from 'react-icons/fa';

//importing components used throughout the application
import Navigation from '../../components/navigation/navigation';
import BookCard from '../../components/bookCard/bookCard';

import './Search.css'

const Search = () => {
    const [book, setBook] = useState('');
    const [results, setResults] = useState([]);

    async function findBook(book) {
        try{
            const response = await fetch(`http://openlibrary.org/search.json?q=${book}`)
            const data = await response.json();
            setResults(data.docs);
            //console.log(data.docs[1]);
            //console.log(data.docs[1].title);
            console.log(results[1].isbn[0]);

        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => findBook(book), [book])

    const handleSubmit = (e) => {
        e.preventDefault();
        findBook(book);
    }

    return(
        <div className="search-books">
            <Navigation />

            <form onSubmit={handleSubmit}>
                <label><FaSearch /></label>
                <input placeholder="Search For A Good Read"
                   value={book} onChange={(e) => setBook(e.target.value)}
                />
            </form>

            <div className="search-result">
                {
                    results.map((result, i) => {
                        if(i < 9){
                            return(
                                <BookCard title={result.title} author={result.author_name} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Search;