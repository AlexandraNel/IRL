const db = require('../config/connection');
const { User, Event, Match } = require('../models');

module.exports = async (modelName) => {
  try {
    switch (modelName) {
      case 'User':
        await User.collection.drop();
        break;
      case 'Event':
        await Event.collection.drop();
        break;
      case 'Match':
        await Match.collection.drop();
        break;
      default:
        throw new Error(`Unknown model: ${modelName}`);
    }
  } catch (err) {
    if (err.message !== 'ns not found') {
      throw err;
    }
  }
};
