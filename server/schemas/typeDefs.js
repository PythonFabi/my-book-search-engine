const { gql } = require('apollo-server-express');

const typeDefs = gql`
// return type user that saves books in an array in savedBooks
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Integer
    savedBooks: [Book]!
  }
  
//   return type book
  type Book {
    bookId: String
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }
  
//   return Auth type with token and user
  type Auth {
    token: ID!
    user: User
  }
  
//   return me as a User
  type Query {
    me: User
  }
  
//   return login mutation, addUser, saveBook and removeBook
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String!, link: String!): User
    removeBook(bookId: ID!): User
  }`