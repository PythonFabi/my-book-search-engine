import { gql } from "@apollo/client";

export const GET_ME = gql`
// use query to get the current User
   query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
   }`;
