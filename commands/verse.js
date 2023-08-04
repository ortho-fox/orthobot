// /commands/verse.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { getBookandReference, titleCase } = require('../utils/bibleUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verse')
    .setDescription('Retrieve a specific Bible verse')
    .addStringOption(option =>
      option.setName('reference')
        .setDescription('The reference of the verse (e.g., "john 3:16")')
        .setRequired(true)),
  async execute(interaction) {
    const reference = interaction.options.getString('reference');

    const [book, chapter, verse] = getBookandReference(reference);

    if (!book || !chapter || !verse) {
      return interaction.reply('Invalid reference format. Please use the format "book chapter:verse" (e.g., "john 3:16").');
    }

    // Replace this with your actual code to retrieve the verse text from your Bible data
    // For example:
    const bibleData = require('../bible.json');
    if (!bibleData[book] || !bibleData[book][chapter] || !bibleData[book][chapter][verse]) {
      return interaction.reply('Verse not found.');
    }

    const verseText = bibleData[book][chapter][verse];

    const formattedReference = titleCase(book) + ' ' + chapter + ':' + verse;

    // Construct the URL parameters from the existing data
    const url = `https://orthodox-reader.vercel.app/${book}/${chapter}`;

    const embedMessage = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle(formattedReference)
      .setDescription(verseText)
      .setTimestamp()
      .setFooter({ text: '\n 🦊 orthofox' });


    // Create a hyperlink button
    const button = new MessageButton()
      .setStyle('LINK')
      .setLabel('Read More')
      .setURL(url);

    // Add the button to an action row
    const actionRow = new MessageActionRow()
      .addComponents(button);

    interaction.reply({ embeds: [embedMessage], components: [actionRow] });
  },
};
