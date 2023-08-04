// /commands/help.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
  async execute(interaction) {
    // Here, you can access the loaded commands from the client.commands collection
    const commands = interaction.client.commands;

    const embedMessage = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle('Available Commands')
      .setDescription(commands.map(command => `/${command.data.name}`).join('\n'))
      .setTimestamp()
      .setFooter({ text: 'from 🦊 orthofox' });

    interaction.reply({ embeds: [embedMessage] });
  },
};
