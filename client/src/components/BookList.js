import React, { useState } from 'react'
import { useQuery } from "@apollo/client";
import { GET_BOOKLIST_QUERY } from "../queries/query";
import BookDetail from './BookDetail';


function BookList() {


    const [bookId, setBookID] = useState("");

    const { loading, error, data } = useQuery(GET_BOOKLIST_QUERY);


    const displayData = () => {
        if (loading) {
            return <h1>Loading....</h1>
        }
        if (error) {
            return <h2>Error..</h2>
        }
        return data.books.map(book => {
            return (
                <li key={book.id} onClick={e => { setBookID(book.id) }}>
                    {book.name}
                </li>
            )
        })
    }

    return (
        <div>
            <ul id="book-list">
                {displayData()}
            </ul>
            <BookDetail bookId={bookId} />
        </div>
    )
}

export default BookList
