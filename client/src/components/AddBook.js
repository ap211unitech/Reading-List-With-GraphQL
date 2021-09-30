import React, { Fragment, useState } from 'react'
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS_QUERY, GET_BOOKLIST_QUERY, ADD_BOOK_MUTATION } from "../queries/query";


function AddBookComponent() {

    const [bookName, setBookName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");


    let { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

    const displayAuthors = () => {
        if (loading) {
            return <Fragment>Loading....</Fragment>
        }
        if (error) {
            return <Fragment>Error..</Fragment>
        }
        return data.authors.map(author => {
            return (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>
            )
        })
    }



    let [addBook] = useMutation(ADD_BOOK_MUTATION);
    const SubmitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: bookName,
                genre: genre,
                authorId: author
            },
            refetchQueries: [
                {
                    query: GET_BOOKLIST_QUERY
                }
            ]
        });
        setBookName("");
        setGenre("");
        setAuthor("");
    }

    return (
        <Fragment>
            <form id="add-book" onSubmit={SubmitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={bookName} onChange={e => setBookName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select value={author} onChange={e => setAuthor(e.target.value)}>
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </Fragment>
    )
}

export default AddBookComponent
