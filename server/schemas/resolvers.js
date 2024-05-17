const { GraphQLDate, GraphQLDateTime } = require('graphql-scalars');
const { AuthenticationError } = require("apollo-server-express");
const { User, Event, Match, Prompt } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {

  Date: GraphQLDate,
  DateTime: GraphQLDateTime,


  Query: {
    users: async () => {
      await User.find().populate('events');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('events');
    },
    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },

    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId });
    },

    prompt: async (parent, { promptId }) => {
      return Prompt.findOne({ _id: promptId });
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email or password");
      }
      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password");
      }
      const token = signToken(user);
      return { token, user };
    },

    addEvent: async (parent, { eventName, eventDescription, eventCreator, eventDateRange }) => {
      const event = await Event.create({ eventName, eventDescription, eventCreator, eventDateRange });

      await User.findOneAndUpdate(
        { username: eventCreator },
        { $addToSet: { events: event._id } }
      );

      return event;
    },

    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, args, { new: true });
    //   }

    //   throw AuthenticationError;
    // },

    // updateEvent: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1;

    //   return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    // },
     
  },
};
module.exports = resolvers;