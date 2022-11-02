const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require( '../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const myData = await User.findOne({ _id: context.user._id })
            return myData;
        }
  
        throw new AuthenticationError("Not logged in");
      },
    },
    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
  
        const token = signToken(user);
        return { token, user };
      },

      addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const newBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: input } },
          { new: true }
        );
        return newBook;
      }
      throw new AuthenticationError("You need to be logged in to save books");
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const deleteBook = User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        return deleteBook;
      }
      throw new AuthenticationError("You need to login to delete books");
    },
  },
};

module.exports = resolvers;