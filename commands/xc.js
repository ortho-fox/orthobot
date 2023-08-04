// /commands/xc.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('xc')
    .setDescription('Select a specific verse category'),
  async execute(interaction) {
    const options = [
      {
        label: 'The Beatitudes (Matthew 5:3-12)',
        value: 'beatitudes',
      },
      {
        label: 'Sermon on the Mount (Matthew 5-7)',
        value: 'sermon',
      },
      // Add other options here
    ];

    const selectMenu = new MessageSelectMenu()
      .setCustomId('xc_menu')
      .setPlaceholder('Select a Verse Category');

    for (const option of options) {
      selectMenu.addOptions({
        label: option.label,
        value: option.value,
      });
    }

    const actionRow = new MessageActionRow().addComponents(selectMenu);

    // Use followUp instead of reply to send the components separately
    await interaction.followUp({
      content: 'Please select a verse category:',
      components: [actionRow],
    });
  },
};
