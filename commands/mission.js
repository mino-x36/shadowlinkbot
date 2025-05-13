// Mission Command - Posts a formatted mission briefing
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { checkAdminPermission } = require('../utils/permissionCheck');
const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mission')
    .setDescription('Post a mission briefing for Shadow Corporation operatives')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Mission title/codename')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('objective')
        .setDescription('Primary mission objective')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('details')
        .setDescription('Mission details and instructions')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('status')
        .setDescription('Mission status')
        .setRequired(true)
        .addChoices(
          { name: 'ACTIVE - Ready for deployment', value: 'ACTIVE' },
          { name: 'PENDING - Awaiting authorization', value: 'PENDING' },
          { name: 'CRITICAL - Immediate action required', value: 'CRITICAL' }
        ))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
  async execute(interaction) {
    // Check if user has admin permissions
    if (!await checkAdminPermission(interaction)) {
      return;
    }
    
    const title = interaction.options.getString('title');
    const objective = interaction.options.getString('objective');
    const details = interaction.options.getString('details');
    const status = interaction.options.getString('status');
    
    // Determine color based on status
    let statusColor;
    switch (status) {
      case 'ACTIVE':
        statusColor = 0x3498db; // Blue
        break;
      case 'PENDING':
        statusColor = 0xf39c12; // Orange
        break;
      case 'CRITICAL':
        statusColor = 0xe74c3c; // Red
        break;
      default:
        statusColor = 0x2f3136; // Default dark
    }
    
    try {
      // Create mission briefing embed
      const missionEmbed = createEmbed({
        title: `MISSION BRIEFING: ${title.toUpperCase()}`,
        description: 'SHADOW CORPORATION CLASSIFIED INTELLIGENCE',
        color: statusColor,
        timestamp: true,
        footer: `STATUS: ${status} | SHADOW LINK MISSION DATABASE`,
        fields: [
          {
            name: 'PRIMARY OBJECTIVE',
            value: objective,
            inline: false
          },
          {
            name: 'MISSION DETAILS',
            value: details,
            inline: false
          },
          {
            name: 'AUTHORIZATION',
            value: `Authorized by: ${interaction.user.tag}`,
            inline: true
          },
          {
            name: 'SECURITY LEVEL',
            value: 'CLASSIFIED',
            inline: true
          }
        ]
      });
      
      // Send the mission briefing
      await interaction.reply({ embeds: [missionEmbed] });
    } catch (error) {
      console.error('Error sending mission briefing:', error);
      await interaction.reply({ 
        content: 'ERROR: Mission briefing transmission failed. Report to technical division.', 
        ephemeral: true 
      });
    }
  },
};