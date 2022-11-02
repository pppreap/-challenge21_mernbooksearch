import { gql } from "@apollo/client";

// import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
        }
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
        _id
        username 
        email
        savedBooks {
            bookId
            authors
            image
            description
            title 
            link  
        }
    }
}
`;


export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username 
        email
        bookCount
        savedBooks {
            bookId
            authors
            image 
            description
            title 
            link   
        }
    }
}
`;