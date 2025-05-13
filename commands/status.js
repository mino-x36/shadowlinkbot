// Status Command - Sets the bot's custom status message
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { checkAdminPermission } = require('../utils/permissionCheck');
const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Set Shadow Link\'s status message')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The status message to display')
        .setRequired(true)
        .setAutocomplete(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      'ALERT: All systems operational',
      'STANDBY: Awaiting orders',
      'ACTIVE: Mission in progress',
      'SECURE: Communications locked down',
      'CRITICAL: System breach detected',
      'MAINTENANCE: Systems under repair'
    ];
    
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  },
  
  async execute(interaction) {
    // Check if user has admin permissions
    if (!await checkAdminPermission(interaction)) {
      return;
    }
    
    const statusMessage = interaction.options.getString('message');
    
    try {
      // Set the bot's status
      await interaction.client.user.setActivity(statusMessage);
      
      // Create an embed response
      const embed = createEmbed({
        title: 'STATUS UPDATE',
        description: `New status set: **${statusMessage}**`,
        color: 0x2f3136,
        footer: 'SHADOW LINK v1.0 - STATUS PROTOCOL'
      });
      
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error setting status:', error);
      await interaction.reply({ 
        content: 'ERROR: Failed to update status. Report to technical division.', 
        ephemeral: true 
      });
    }
  },
};