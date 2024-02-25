import React from 'react'
import { getBook } from '../GraphQL/queries'
import { useQuery } from '@apollo/client'

function BookDetail({ bookId }) {
    let {data, loading} = useQuery(getBook, {
        variables: {id : bookId},
        skip : !bookId
    })
    if(!data){
        return (
            <div id="book-details">
                Select a Book from the list. 
            </div>
        )
    }
    const {book} = data
    return (
        <div id="book-details">
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by this author:</p>
            <ul className='other-books'>
                {
                    book.author.books.length === 0 && <p>No other books by this author</p>
                }
                {
                    book.author.books.length && book.author.books.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default BookDetail
