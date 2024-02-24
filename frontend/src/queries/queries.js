import { gql } from "@apollo/client";

const getAuthors = gql`
    query getAuthors{
        authors{
            name
            id
        }
    }
`

const getBooks = gql`
    query getBooks{
        books {
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation{
        addBook(name : "", genre : "", authorId : ""){
            name
            id
        }
    }
`

export { getAuthors, getBooks, addBookMutation }