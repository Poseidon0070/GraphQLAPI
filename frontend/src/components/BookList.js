import React from 'react';
import { useQuery } from '@apollo/client';
import {getBooks} from '../queries/queries'

function BookList(props) {
  const { loading, error, data } = useQuery(getBooks);
  return (
    <div className='container'>
      {error && <p>Some error occured</p>}
      {!error && loading ? <p>Loading</p> : (
        <div>
          <h2>Book List</h2>
          <ul>
            {data.books.map(book => (
              <li key={book.id}><p>{book.name}</p></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookList;
