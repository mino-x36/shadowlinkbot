// Rank Command - Returns a user's current role/rank in the server
const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Display the rank of a Shadow Corporation member')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to check')
        .setRequired(false)),
  
  async execute(interaction) {
    // Get the target user (or the command user if not specified)
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(targetUser.id);
    
    if (!member) {
      return interaction.reply({ 
        content: 'ERROR: Target not found in database. Verify and retry.', 
        ephemeral: true 
      });
    }
    
    try {
      // Get the member's roles (excluding @everyone)
      const roles = member.roles.cache
        .filter(role => role.id !== interaction.guild.id)
        .sort((a, b) => b.position - a.position) // Sort by position (highest first)
        .map(role => role.name);
      
      // Determine the highest role (if any)
      const highestRole = roles.length > 0 ? roles[0] : 'Unranked';
      
      // Create fields for all roles
      const roleFields = [];
      if (roles.length > 0) {
        roleFields.push({
          name: 'ASSIGNED ROLES',
          value: roles.join('\n'),
          inline: false
        });
      } else {
        roleFields.push({
          name: 'ASSIGNED ROLES',
          value: 'No roles assigned.',
          inline: false
        });
      }
      
      // Create the rank embed
      const rankEmbed = createEmbed({
        title: 'SHADOW CORPORATION PERSONNEL FILE',
        description: `Personnel record for operative ${targetUser}.`,
        color: 0x2f3136,
        thumbnail: targetUser.displayAvatarURL({ dynamic: true }),
        fields: [
          {
            name: 'OPERATIVE ID',
            value: targetUser.id,
            inline: true
          },
          {
            name: 'HIGHEST RANK',
            value: highestRole,
            inline: true
          },
          {
            name: 'JOIN DATE',
            value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
            inline: true
          },
          ...roleFields
        ],
        footer: 'SHADOW LINK v1.0 - PERSONNEL DATABASE'
      });
      
      await interaction.reply({ embeds: [rankEmbed] });
    } catch (error) {
      console.error('Error retrieving rank information:', error);
      await interaction.reply({ 
        content: 'ERROR: Failed to access personnel database. Report to technical division.', 
        ephemeral: true 
      });
    }
  },
};