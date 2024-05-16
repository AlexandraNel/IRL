const { DateResolver, DateTimeResolver } = require('graphql-scalars');
const { AuthenticationError } = require('apollo-server-express');
const { User, Event, Match, Prompt } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require ("bcrypt");

const resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,

  Gender: {
    Male: 'Male',
    Female: 'Female',
    NonBinary: 'Non-binary',
    PreferNotToSay: 'Prefer Not To Say',
  },

  HereFor: {
    Romance: 'Romance',
    Friendship: 'Friendship',
    GroupOutings: 'Group Outtings',
    Relationship: 'Relationship',
    NotSure: 'Not Sure',
  },

  
    Query: {
      allUsers: async () => await User.find(),
      user: async (_, { id }) => await User.findById(id),
      allEvents: async () => await Event.find(),
      event: async (_, { id }) => await Event.findById(id),
      match: async (_, { id }) => await Match.findById(id),
      prompt: async (_, { id }) => await Prompt.findById(id),
    },
  

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (parent, args) => {
      return Event.create(args);
    },
    updateUser: async (parent, args) => {
      return User.findByIdAndUpdate(args._id, args, { new: true });
    },
    updateEvent: async (parent, args) => {
      return Event.findByIdAndUpdate(args._id, args, { new: true });
    },
    addMatch: async (parent, { eventId, posterId, responderId }) => {
      const match = await Match.create({ eventId, posterId, responderId });
      return match.populate('event poster responder');
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
  },
};



module.exports = resolvers;
