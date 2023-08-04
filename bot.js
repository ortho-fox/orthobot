// bot.js

//Import libraries
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const fs = require('fs');
const titleCase = require('title-case'); //https://www.npmjs.com/package/title-case


// Import handleMessage function from the 'utils/handleMessage' file
const handleMessage = require('./utils/handleMessage');

//Load in the Bible
const fileContents = fs.readFileSync('bible.json', 'utf8');
const bible = JSON.parse(fileContents);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console({
    colorize: true
}));
logger.level = 'debug';

// Initialize Discord Bot
const client = new Discord.Client();

client.once('ready', () => {
    console.log("ready!");
});

client.login(auth.token);

client.on('message', async message => {
    //Only triggers code if message falls into one of the possible categories
    const messageText = message.content;

    //Accept more than 1 reference
    const messages = messageText.split(";");

    for (const text of messages) {
        handleMessage(text.trim(), message, bible);
    }
});
