import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  const { loading, data, error } = useQuery(GET_ME);
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // updata the userData state if userdata is available
  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  // create a function that handles the remove book mutation
  const [removeBook] = useMutation(REMOVE_BOOK);
  // delete book function that takes in the bookId and uses the authenticated user
  const handleDeleteBook = async (bookId) => {
    try {
      const user = Auth.getProfile().data;
      // removes book once data comes in
      const response = await removeBook({
        variables: { bookId: bookId, userId: user._id },
      });

      // if response has data bookId, remove bookId
    if (response.data) {
      removeBookId(bookId);
    }

    // error handling
    } catch (error) {
      console.log(error);
    }
  };
  // display if loading or error existing
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if(error) {
    return <h2>An error occurred: {error.message}</h2>;
  }

  // create function that accepts the book's mongo _id value as param and deletes the book from the database

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
