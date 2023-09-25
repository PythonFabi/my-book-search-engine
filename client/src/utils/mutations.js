import { gql } from "@apollo/client";

// execute loginUser mutation set up using Apollo Server
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          _id
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
  }
`;

// execute addUser mutation set up using Apollo Server
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
      }
    }
  }
`;

// execute saveBook mutation set up using Apollo Server
export const SAVE_BOOK = gql`
  mutation saveBook($bookInfo: bookInput!, $user: userInput!) {
    saveBook(bookInfo: $bookInfo, user: $user)
      user {
        _id
        username
        email
        bookCount
        savedBook {
          _id
          authors
          bookId
          description
          image
          link
          title
        }
      }
    }
`;

// execute removeBook mutation set up using Apollo Server
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      user {
        _id
        username
        bookCount
        email
        savedBooks {
          _id
          authors
          bookId
          description
          title
        }
      }
    }
  }
`;
