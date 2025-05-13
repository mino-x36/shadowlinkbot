// Interaction Create Event - Handles slash commands and autocomplete
const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Handle Slash Command interactions
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
        
        // Check if the interaction has already been replied to
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ 
            content: 'ERROR: Command execution failed. Report to technical division.', 
            ephemeral: true 
          });
        } else {
          await interaction.reply({ 
            content: 'ERROR: Command execution failed. Report to technical division.', 
            ephemeral: true 
          });
        }
      }
    }
    
    // Handle autocomplete interactions
    else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command || !command.autocomplete) {
        console.error(`No autocomplete handler for ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(`Error handling autocomplete for ${interaction.commandName}`);
        console.error(error);
      }
    }
  },
};