const { AuthentificationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get single user either by their id or their username
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne(
          { _id: context.user._id },
          { username: context.user.username }
        );
      }
      throw new AuthentificationError("You need to be logged in!");
    },
  },

  Mutation: {
    // create a user with username, email, password, sign a token and send it back to Signupform.js
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login user, sign token and send back to loginform.js
    // take email and password
    login: async (parent, { email, password }) => {
      // find user by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthentificationError(
          "No user found with this email address"
        );
      }

      // check for correct password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthentificationError("Incorrect credentials");
      }

      // sign token
      const token = signToken(user);

      return { token, user };
    },
    // save new book to the current logged in user
    saveBook: async (parent, { body }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: body } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthentificationError("You need to be logged in!");
    },
    // remove a book from savedBooks
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneandUpdate(
          // look for user id and pull book from the savedBooks
          { _id: context.user._id },
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );
      }

      throw new AuthentificationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
