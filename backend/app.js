const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql : true
}))


mongoose.connect('mongodb://localhost:27017/graphQL').then(() => {
    app.listen(8080,() => {
        console.log("Listening for request on port 8080")
    })
})
