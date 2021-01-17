import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../Auth'

import { auth } from '../config/firebase'
import { db } from '../config/firebase'

const Shelf = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");

    const [books, setBooks] = useState([]);

    const { user } = useContext(UserContext);

    

    useEffect(() => {
        db.collection('users').doc(user.uid).collection('books').onSnapshot(snapshot => {
            setBooks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })
    }, [user.uid])

    const handleRemove = (id) => {
        db.collection('users').doc(user.uid).collection('books').doc(id).delete();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(title === "" || author === ""){
            alert("Woah you didn't type anything in")
        } else{
            try{
                db.collection('users').doc(user.uid).collection('books').add(
                    {
                        title: title,
                        author: author,
                        status: status,
                        date: date
                    }
                )
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
            <div className="signout">
                <button onClick={() => auth.signOut()}>Sign Out</button>
            </div>
            <h1>Book Shelf</h1>
            <h2>Welcome {user.displayName}!</h2>
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
                                    <option defaultChecked>---</option>
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