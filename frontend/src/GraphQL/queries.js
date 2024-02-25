import { gql } from "@apollo/client";

const getAuthors = gql`
    query getAuthors{
        authors{
            name
            id
        }
    }
`
// getBooks is optional
const getBooks = gql`
query getBooks{                                              
        books {
            name
            id
        }
    }
`


const getBook = gql`
    query getBook($id : ID!){
        book(id : $id){
            name,
            genre,
            author{
                name,
                age,
                books{
                    name,
                    genre
                }
            }
        }
    }
`



export { getAuthors, getBooks, getBook }