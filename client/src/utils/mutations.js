import { gql } from "@apollo/client";

// execute loginUser mutation set up using Apollo Server
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

// execute saveBook mutation set up using Apollo Server
export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]
    $description: String!
    $title: String!
    $bookId: String!
    $image: String
    $link: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      user {
        _id
        username
      }
    }
  }
`;

// execute removeBook mutation set up using Apollo Server
export const REMOVE_BOOK = gql`
  mutation removeBook($bookdId: ID!) {
    removeBook(bookId: $bookId) {
      user {
        _id
        username
      }
    }
  }
`;
