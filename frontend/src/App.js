import React from 'react'
import BookList from './components/BookList'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Author from './components/Author';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
    <main id="main">
        <BookList />
        <Author />
        </main>
    </ApolloProvider>
  )
}

export default App
