const { gql } = require('apollo-server-express');

// define typeDefs for User, Book, for Auth, and Query type, then define inputs for book and user, and finally define mutations 
// for login, addUser, saveBook and removeBook
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Book {
    _id: ID
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Query {
    me: User
  }

  input bookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  input userInput {
    _id: ID!
    username: String!
    email: String!
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInfo: bookInput!, user: userInput!): User
    removeBook(bookId: ID!): User
  }`