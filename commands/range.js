// /commands/range.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getBookandReference, getRangeofTextInChapter, titleCase } = require('../utils/bibleUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('range')
    .setDescription('Retrieve a range of Bible verses within a chapter')
    .addStringOption(option =>
      option.setName('start')
        .setDescription('The starting reference of the range (e.g., "john 3:16")')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('end')
        .setDescription('The ending reference of the range (e.g., "john 3:18")')
        .setRequired(true)),
  async execute(interaction) {
    const startReference = interaction.options.getString('start');
    const endReference = interaction.options.getString('end');
    console.log('Start Reference:', startReference);
    console.log('End Reference:', endReference);

    const [startBook, startChapter, startVerse] = getBookandReference(startReference);
    const [endBook, endChapter, endVerse] = getBookandReference(endReference);
    console.log('Start Book:', startBook);
    console.log('Start Chapter:', startChapter);
    console.log('Start Verse:', startVerse);
    console.log('End Book:', endBook);
    console.log('End Chapter:', endChapter);
    console.log('End Verse:', endVerse);

    if (startBook !== endBook || startChapter !== endChapter) {
      return interaction.reply('Invalid range format. Please use the format "book chapter:verse - book chapter:verse".');
    }

    try {
      const startVerseNum = parseInt(startVerse);
      const endVerseNum = parseInt(endVerse);
      if (isNaN(startVerseNum) || isNaN(endVerseNum) || startVerseNum > endVerseNum) {
        return interaction.reply('Invalid verse format. Please use valid verse numbers for the range.');
      }

      // Load the Bible data from bot.js
      const bible = require('../bible.json');
      const returnMessage = getRangeofTextInChapter(bible, startBook, startChapter, startVerseNum, endVerseNum);
      const formattedReference = titleCase(startBook) + ' ' + startChapter + ':' + startVerseNum + ' - ' + startChapter + ':' + endVerseNum;
      const embedMessage = new MessageEmbed()
        .setColor('#fff')
        .setTitle(formattedReference)
        .setDescription(returnMessage)
        .setTimestamp()
        .setFooter('from 🦊 orthofox');

      interaction.reply({ embeds: [embedMessage] });
    } catch (error) {
      interaction.reply('An error occurred while retrieving the range of verses.');
    }
  },
};
