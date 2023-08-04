// bot.js

// Import libraries
const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const { getRandomVerse } = require('./utils/bibleUtils');

const fs = require('fs');

// Import handleMessage function from the 'utils/handleMessage' file
const handleMessage = require('./utils/handleMessage');

// Load in the Bible
const fileContents = fs.readFileSync('bible.json', 'utf8');
const bible = JSON.parse(fileContents);

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console({
    colorize: true
}));
logger.level = 'debug';

// Initialize Discord Bot
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,          // Required intent
        Discord.Intents.FLAGS.GUILD_MESSAGES,  // Required intent
        // Add any other intents your bot needs based on the events it listens to
    ],
    commands: new Collection(),

});

// Create a new Collection to store commands
client.commands = new Collection(); // Add this line

// Load slash commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Add the xc command after loading other commands
client.commands.set('xc', require('./commands/xc'));


client.once('ready', () => {
    console.log("ready!");
});

client.login(auth.token);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'xc') {
        const selectedValue = interaction.customId; // Corrected this line

        if (!selectedValue) {
            // User didn't select any value, handle this case
            return interaction.reply('Please select a valid verse category.');
        }

        // Handle the selected value based on the category chosen
        const options = {
            beatitudes: 'matthew 5:3-matthew 5:12',
            sermon: 'matthew 5:1-matthew 7:29',
            // Add other options here
        };

        const rangeCommand = `/range ${options[selectedValue]}`;
        const command = client.commands.get('range');
        await command.execute({ ...interaction, content: rangeCommand }, client);
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, bible);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
    }
});

client.on('messageCreate', async message => {
    // Only triggers code if message is not from a bot and falls into one of the possible categories
    if (!message.author.bot) {
        const messageText = message.content;

        // Accept more than 1 reference
        const messages = messageText.split(";");

        for (const text of messages) {
            handleMessage(text.trim(), message, bible);
        }
    }
});


