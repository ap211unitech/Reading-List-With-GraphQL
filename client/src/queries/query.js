
import { gql } from "@apollo/client";


export const getBooksQuery = gql`
    {
        books{
            id
            name
        }
    }
`;

export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const addBookMutation = gql`
        mutation addBook($name:String!,$genre:String!,$authorID:ID!) {
            addBook(name:$name,genre:$genre,authorId:$authorID) {
                name
                id
            }
        }
`;


