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
    allUsers: async () => {
      return User.find();
    },
    allEvents: async () => {
      return Event.find();
    },
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
    event: async (parent, { _id }) => {
      return Event.findById(_id);
    },
    match: async (parent, { _id }) => {
      return Match.findById(_id).populate('event poster responder');
    },
    prompt: async (parent, { _id }) => {
      return Prompt.findById(_id);
    },
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
