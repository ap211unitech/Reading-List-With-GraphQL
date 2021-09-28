import React from 'react'
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/query";


function BookList() {


    const { loading, error, data } = useQuery(getBooksQuery);


    const displayData = () => {
        if (loading) {
            return <h1>Loading....</h1>
        }
        if (error) {
            return <h2>Error..</h2>
        }
        return data.books.map(book => {
            return (
                <li key={book.id}>
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
        </div>
    )
}

export default BookList
