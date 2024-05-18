const db = require('../config/connection');
const { User, Event, Match } = require('../models');
const cleanDB = require('./cleanDb');
const userData = require('./userData.json');
const eventData = require('./eventData.json');
const matchData = require('./matchData.json');

const seedDatabase = async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Event', 'events');
    await cleanDB('Match', 'matches');

    // Create users
    const users = await User.create(userData);

    // Map usernames to user IDs
    const userIdMap = {};
    users.forEach(user => {
      userIdMap[user.username] = user._id;
    });

    // Replace placeholder creator usernames with actual IDs in events
    const eventsWithCreatorIds = eventData.map(event => ({
      ...event,
      creator: userIdMap[event.creator]
    }));

    // Create events
    const events = await Event.create(eventsWithCreatorIds);

    // Map event names to event IDs
    const eventIdMap = {};
    events.forEach(event => {
      eventIdMap[event.name] = event._id;
    });

    // Replace placeholder event and user usernames with actual IDs in matches
    const matchesWithIds = matchData.map(match => ({
      ...match,
      eventId: eventIdMap[match.eventId],
      creatorId: userIdMap[match.creatorId],
      matcherId: userIdMap[match.matcherId]
    }));

    // Create matches
    await Match.create(matchesWithIds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
