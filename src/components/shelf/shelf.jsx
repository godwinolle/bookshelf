import React, { useState, useEffect } from 'react';

import { db } from '../config/firebase'

const Shelf = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Read");
    const [date, setDate] = useState("N/A");

    const [books, setBooks] = useState([]);


    useEffect(() => {
        db.collection('books').onSnapshot(snapshot => {
            setBooks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
    }, [])

    const handleRemove = (id) => {
        db.collection('books').doc(id).delete();
    }

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
                                        <td>{book.data.title}</td>
                                        <td>{book.data.author}</td>
                                        <td>{book.data.status}</td>
                                        <td>{book.data.date}</td>
                                        <td className="delete" onClick={
                                            () => handleRemove(book.id)
                                        }>X</td>
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