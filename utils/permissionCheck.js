// Permission Check - Checks if a user has admin permissions
const { createEmbed } = require('./embedBuilder');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Checks if a user has admin permissions for sensitive commands
 * @param {Interaction} interaction - The Discord interaction object
 * @returns {boolean} Whether the user has admin permissions
 */
async function checkAdminPermission(interaction) {
  // Get the admin role ID from environment variables
  const adminRoleId = process.env.ADMIN_ROLE_ID;
  
  // Check if the user has the admin role or is a server administrator
  const hasPermission = interaction.member.roles.cache.has(adminRoleId) || 
                         interaction.member.permissions.has('Administrator');
  
  if (!hasPermission) {
    // Create an error embed
    const errorEmbed = createEmbed({
      title: 'ACCESS DENIED',
      description: 'You lack the necessary clearance level to execute this command.',
      color: 0xe74c3c, // Red for error
      footer: 'SHADOW LINK v1.0 - SECURITY PROTOCOL'
    });
    
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return false;
  }
  
  return true;
}

module.exports = {
  checkAdminPermission
};