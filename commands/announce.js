// Announce Command - Sends an announcement to a specific channel
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { checkAdminPermission } = require('../utils/permissionCheck');
const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Send an official Shadow Corporation announcement')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to send the announcement to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('The title of the announcement')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The announcement message')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction) {
    // Check if user has admin permissions
    if (!await checkAdminPermission(interaction)) {
      return;
    }
    
    const channel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    
    try {
      // Create announcement embed
      const announcementEmbed = createEmbed({
        title: title.toUpperCase(),
        description: message,
        color: 0x2f3136,
        timestamp: true,
        footer: 'SHADOW CORPORATION OFFICIAL ANNOUNCEMENT'
      });
      
      // Send the announcement
      await channel.send({ embeds: [announcementEmbed] });
      
      // Create a confirmation embed
      const confirmEmbed = createEmbed({
        title: 'ANNOUNCEMENT DEPLOYED',
        description: `Announcement successfully sent to ${channel}.`,
        color: 0x2f3136,
        footer: 'SHADOW LINK v1.0 - COMMUNICATIONS PROTOCOL'
      });
      
      await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });
    } catch (error) {
      console.error('Error sending announcement:', error);
      await interaction.reply({ 
        content: 'ERROR: Failed to send announcement. Check channel permissions or report to technical division.', 
        ephemeral: true 
      });
    }
  },
};