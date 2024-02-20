import React from 'react'
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
  uri : 'http://localhost:8080/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>
        Graph QL
        <BookList />
      </h1>
    </ApolloProvider>
  )
}

export default App
  