import React, {useRef} from 'react'
import { useQuery } from '@apollo/client'
import {getAuthors, addBookMutation} from '../queries/queries'


function Author() {
    let { loading, error, data } = useQuery(getAuthors)
    let nameRef = useRef()
    let genreRef = useRef()
    let authorRef = useRef()

    let submitHandler = (event) => {
        event.preventDefault()
        let name = nameRef.current.value 
        let genre = genreRef.current.value 
        let author = authorRef.current.value
        console.log(name, genre, author)
    }

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
    )
}

export default Author
