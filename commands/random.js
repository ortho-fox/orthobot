// /commands/random.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getRandomVerse, titleCase } = require('../utils/bibleUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Retrieve a random Bible verse'),
  async execute(interaction, bible) { // Add the 'bible' argument here
    try {
      const randomVerse = getRandomVerse(bible); // Pass the bible data to the function
      const { book, chapter, verse, text: verseText } = randomVerse;

      const formattedReference = titleCase(book) + ' ' + chapter + (verse ? (':' + verse) : '');
      const embedMessage = new MessageEmbed()
        .setColor('#fff')
        .setTitle(formattedReference)
        .setDescription(verseText)
        .setTimestamp()
        .setFooter({ text: '(nkjv) - 🦊 orthofox' });

      interaction.reply({ embeds: [embedMessage] });
    } catch (error) {
      interaction.reply('An error occurred while retrieving the random verse.');
    }
  },
};

// ... (previous code)
