import React, { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthors } from '../GraphQL/queries';
import { ADD_BOOK } from '../GraphQL/mutations';
import {getBooks} from '../GraphQL/queries'

function Author() {
  const { loading, data } = useQuery(getAuthors);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries : [
      getBooks,
    ]
  }); 

  const nameRef = useRef();
  const genreRef = useRef();
  const authorRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const genre = genreRef.current.value;
    const authorId = authorRef.current.value; // Use authorId instead of author

    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId // Use authorId instead of author
      },
      // refetchQueries : [
      //   {query : getBooks}
      // ]
    })
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='name' className='form-label'>Name</label>
            <input ref={nameRef} className='form-control' name='name' id='name' />
          </div>
          <div>
            <label htmlFor='genre' className='form-label'>Genre</label>
            <input ref={genreRef} className='form-control' name='genre' id='genre' />
          </div>
          <div className='mt-3'>
            <label htmlFor='author' className='form-label'>Authors</label>
            <select ref={authorRef} className='form-select'>
              <option>Select Author</option>
              {loading && <option disabled>Loading</option>}
              {!loading &&
                data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
              }
            </select>
          </div>
          <button className='btn btn-success mt-3'>+</button>
        </form>
      </div>
    </>
  );
}

export default Author;

