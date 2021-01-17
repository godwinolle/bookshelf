import React from 'react';

const BookCard = (props) => {
    return(
        <div className="book-card">
            <img src={`http://covers.openlibrary.org/b/isbn/9780385533225-S.jpg`} alt="book-cover" />
            <p className="title">{props.title}</p>
            <p className="author">Author: {props.author}</p>
        </div>
    )
}

export default BookCard;