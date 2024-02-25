import React, { useState } from 'react';
import {  useQuery } from '@apollo/client';
import {getBooks} from '../GraphQL/queries'
import BookDetail from './BookDetail';

function BookList(props) {
  let [bookId, setBookId] = useState(null)
  const { loading, error, data } = useQuery(getBooks);
  

  return (
    <div>
      {error && <p>Some error occured</p>}
      {!error && loading ? <p>Loading</p> : (
        <div>
          <h2 className='text-center mt-4 font-monospace fw-bold'>Book List</h2>
          <ul id="book-list" className='ms-4'>
            {data.books.map(book => (
              <li key={book.id}  onClick={() => {setBookId(book.id)
              }}><span>{book.name}</span></li>
            ))}
          </ul>
        </div>
      )}
      <BookDetail bookId={bookId}/>
    </div>
  );
}

export default BookList;
