import { gql } from "@apollo/client";

// use query to get the current User
export const GET_ME = gql`
   query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            _id
            bookId
            authors
            description
            title
            image
            link
        }
    }
   }`;
