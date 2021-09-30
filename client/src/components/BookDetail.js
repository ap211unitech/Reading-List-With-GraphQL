import React from 'react'
import { GET_BOOK_BY_ID } from '../queries/query'
import { useQuery } from "@apollo/client";

function BookDetail({ bookId }) {

    const { data, loading, error } = useQuery(GET_BOOK_BY_ID, { variables: { id: bookId } });

    const displayBookDetails = () => {

        if (loading) {
            return <h2>Loading....</h2>
        }
        if (error) {
            return <h2>Error..</h2>
        }

        const { book } = data;
        if (book) {
            return (
                <div>
                    <h2>Book : {book.name}</h2>
                    <p>Genre : {book.genre}</p>
                    <p>Author : {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>No book selected...</div>);
        }
    }

    return (
        <div id="book-details">
            {bookId === "" ? <h2>No book selected...</h2> : displayBookDetails()}
        </div>
    )
}

export default BookDetail
