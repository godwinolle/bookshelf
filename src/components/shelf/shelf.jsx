import React, { useState } from 'react';

import { db } from '../config/firebase'

let books = [
    {
        title: 'Relentless',
        author: 'Mark Twain',
        status: 'Not Read',
        date: '2020-12-03'
    },
    {
        title: 'Apple',
        author: 'Tim Cook',
        status: 'Reading',
        date: '2020-12-23'
    }
]

const Shelf = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Read");
    const [date, setDate] = useState("N/A");

    const handleSubmit = (e) => {
        e.preventDefault()
        if(title === "" || author === ""){
            alert("Woah you didn't type anything in")
        } else{
            try{
                db.collection('books').add(
                    {
                        title: title,
                        author: author,
                        status: status,
                        date: date
                    }
                )
                console.log('Successfully added to DB')
            } catch(err) {
                console.log(err)
            }
            setTitle("")
            setAuthor("")
            setStatus("")
            setDate("")
        }
    }

    return(
        <div>
            <form onSubmit={ handleSubmit }>
                <table>
                    <thead>
                        <tr className="heading">
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Date Finished</th>
                            <th>Add/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                            <td>
                                <input type="text" value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                />
                            </td>
                            <td>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Read" defaultValue>Read</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Not Read">Not Read</option>
                                </select>
                            </td>
                            <td>
                                <input type="date" value={date}
                                onChange={(e) => setDate(e.target.value)}
                                />
                            </td>
                            <td className="add">
                                <button type="submit">
                                    Add Book
                                </button>
                            </td>
                        </tr>
                        {
                            books.map((book,i) => {
                                return(
                                    <tr key={i}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.status}</td>
                                        <td>{book.date}</td>
                                        <td className="delete">X</td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </form>
        </div>
    )
}

export default Shelf;