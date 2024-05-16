const db = require('../config/connection');
const { User, Chat, Event, Match, Prompt  } = require('../models');
const cleanDB = require('./cleanDb');
const userData = require('./userData.json');
const catData = require('./catData.json');
db.once('open', async () => {
    //await cleanDB();
    await cleanDB('User', 'users');
    await cleanDB('Cat', 'cats');
    await User.create(userData);
    for (let i = 0; i < catData.length; i++)
    await Cat.create(catData);
console.log('all done!');
process.exit(0);
});