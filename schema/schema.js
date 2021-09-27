const graphql = require("graphql");
const _ = require("lodash");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;

// Models
const Book = require("../models/Book");
const Author = require("../models/Author");




const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: async (parent, args) => {
                const authorByID = await Author.findById(parent.authorId);
                return authorByID;
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: async (parent, args) => {
                const bookById = await Book.find({ authorId: parent.id });
                return bookById;
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return (await Book.findById(args.id));
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return (await Author.findById(args.id));
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                const books = await Book.find();
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                const authors = await Author.find();
                return authors;
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
                age: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age
                })
                const saveAuthor = await newAuthor.save();
                return saveAuthor;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                const saveBook = await newBook.save();
                return saveBook;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})