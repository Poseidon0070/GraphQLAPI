import { gql } from "@apollo/client"

/*
Here are the commonly used scalar types in GraphQL:

String: A UTF‐8 character sequence.
Int: A signed 32‐bit integer.
Float: A signed double-precision floating-point value.
Boolean: true or false.
ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. 
Serialized as a string, but represented as a GraphQLID in the schema.
*/

export const ADD_BOOK = gql`
    mutation addBook($name : String!, $genre : String!, $authorId : ID!){
        addBook(name : $name, genre : $genre, authorId : $authorId){
            name 
        }
    }
`

