const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')

const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql

let books = [
    {name : 'Name of the Wind', genre : 'Fantasy', id : '1', authorId : '2'},
    {name : 'The Final Empire', genre : 'Fantasy', id : '2', authorId : '2'},
    {name : 'The Long Earth', genre : 'Sci-Fi' , id : '3', authorId : '3'}
]

let authors = [
    {name : 'R.D Sharma', age : 46 , id : '1'},
    {name : 'S.Chand', age : 44, id : '2'},
    {name : 'M.S.Chouhan', age : 41 , id : '3'}
]
// why do we define field as a function ? 
// https://www.youtube.com/watch?v=jflhB57loAU&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f&index=14 
// 7:00
// If we do not define it as a function we will get undefine Type function for relation type queries. 
// But if we define it as function, we wont execute it untill once the code is run fully and by that time all the
// types will be known.

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : { type : GraphQLID},
        name : { type : new GraphQLNonNull(GraphQLString)},                                // iske andr jo fields ha wo hi query kr skte hain
        genre : { type : new GraphQLNonNull(GraphQLString)},
        author : {
            type : AuthorType,
            resolve : async(parent,args) => {                                      // parent -> this
                console.log(parent)                                      
                const requiredAuthor = await Author.findById(parent.authorId)
                return requiredAuthor
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : () => ({
        id : { type : new GraphQLNonNull(GraphQLID)},
        name : { type : new GraphQLNonNull(GraphQLString)},
        age : { type : new GraphQLNonNull(GraphQLInt)},
        books : {
            type : new GraphQLList(BookType),
            resolve : async(parent, args) => {
                console.log(parent)
                // let authorBooks = books.filter(book => book.authorId === parent.id)
                let authorBooks = await Book.find({authorId : parent.id})
                return authorBooks
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLID}},
            resolve : async(parent, args) => {
                // const requiredBook = books.find(book => book.id === args.id)
                let requiredBook = await Book.findById(args.id)
                return requiredBook
            }
        },
        author : {
            type : AuthorType, 
            args : {id : {type : GraphQLID}},
            resolve : async(parent, args) => {
                // const requiredAuthor = authors.find(author => author.id === args.id)
                let requiredAuthor = await Author.findById(args.id)
                return requiredAuthor
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve : async(parent, args) => {
                let books = await Book.find()
                // console.log(books)
                return books
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve : async(parent, args) => {
                let authors = await Author.find()
                return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                let author = new Author({ name: args.name, age: args.age })
                try {
                    const savedAuthor = await author.save();
                    console.log("Author added successfully!");
                    return savedAuthor;
                } catch (err) {
                    console.error("Error adding author:", err);
                    throw err; // Ensure errors are propagated
                }
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let newBook = new Book({ name: args.name, genre: args.genre, authorId: args.authorId })
                try {
                    const savedBook = await newBook.save();
                    console.log("Book added successfully!");
                    return savedBook;
                } catch (err) {
                    console.error("Error adding book:", err);
                    throw err; // Ensure errors are propagated
                }
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation 
})