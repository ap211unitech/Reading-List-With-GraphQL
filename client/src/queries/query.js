
import { gql } from "@apollo/client";


export const GET_BOOKLIST_QUERY = gql`
    {
        books{
            id
            name
        }
    }
`;


export const GET_BOOK_BY_ID = gql`
    query($id:ID!){
        book(id:$id){
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;

export const GET_AUTHORS_QUERY = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const ADD_BOOK_MUTATION = gql`
    mutation ($name:String!,$genre:String!,$authorId:String!) {
        addBook(name:$name,genre:$genre,authorId:$authorId) {
            name
            id
        }
    }
`;


