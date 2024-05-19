const { GraphQLDate, GraphQLDateTime } = require('graphql-scalars');
const { AuthenticationError } = require('apollo-server-express');
const { User, Event, Match } = require('../models');
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
      return Event.find().populate('creator');
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId }).populate('creator');
    },

    userMatches: async (parent, { userId }) => {
      try {
        const matches = await Match.find({
          $or: [{ matcherId: userId }]
        }).populate('eventId').populate({
          path: 'eventId',
          populate: { path: 'creator' }
        }).populate('matcherId');

        if (!matches) {
          throw new Error('No matches found');
        }

        console.log("Fetched user matches:", matches); // Add logging
        return matches;
      } catch (error) {
        console.error("Error fetching user matches:", error); // Log errors
        throw new Error("Error fetching user matches: " + error.message);
      }
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

        // Populate the creator field
        const populatedEvent = await Event.findById(event._id).populate('creator');

        return populatedEvent;
      },

      deleteEvent: async (parent, { eventId }) => {
        // Find the event to get the creator's ID
        const event = await Event.findById(eventId);
        if (!event) {
          throw new Error('Event not found');
        }

        // Delete the event
        await Event.findByIdAndDelete(eventId);

        // Remove the event reference from the user's events array
        await User.findByIdAndUpdate(
          event.creator,
          { $pull: { events: eventId } }
        );

        return event;
      },
      createMatch: async (parent, { eventId, matcherId }) => {
        const match = await Match.create({ eventId, matcherId, status: 'pending' });
        return match.populate('eventId').populate({
          path: 'eventId',
          populate: { path: 'creator' }
        }).populate('matcherId');
      },
  
      acceptMatch: async (parent, { matchId }) => {
        const match = await Match.findByIdAndUpdate(matchId, { status: 'accepted' }, { new: true });
        return match.populate('eventId').populate({
          path: 'eventId',
          populate: { path: 'creator' }
        }).populate('matcherId');
      },
  
      deleteMatch: async (parent, { matchId }) => {
        return Match.findByIdAndDelete(matchId);
      },
    },
  };
module.exports = resolvers;
