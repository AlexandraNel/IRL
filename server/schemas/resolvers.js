const { GraphQLDate, GraphQLDateTime } = require('graphql-scalars');
const { AuthenticationError } = require('apollo-server-express');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,

  Query: {
    users: async () => {
      return User.find().populate('events');
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate('events');
    },
    events: async () => {
      return Event.find();
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, lastName, email, password, birthday, gender, profileImage }) => {
      const user = await User.create({ username, lastName, email, password, birthday, gender, profileImage });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, { id, username, lastName, email, birthday, gender, profileImage }) => {
      return User.findByIdAndUpdate(
        id,
        { username, lastName, email, birthday, gender, profileImage },
        { new: true }
      );
    },

    addEvent: async (parent, { name, description, creator, dateRange, createdAt }) => {
      const event = await Event.create({ name, description, creator, dateRange, createdAt });

      await User.findOneAndUpdate(
        { _id: creator },
        { $addToSet: { events: event._id } }
      );

      return event;
    },

    removeEvent: async (parent, { eventId }) => {
      return Event.findOneAndDelete({ _id: eventId });
    },
  },
};

module.exports = resolvers;
