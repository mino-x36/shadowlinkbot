// Ready Event - Runs when the bot is connected to Discord
const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[SHADOW LINK] Operational. Logged in as ${client.user.tag}`);
    
    // Set initial presence
    client.user.setPresence({
      activities: [{ 
        name: 'STANDBY: Awaiting orders', 
        type: ActivityType.Watching 
      }],
      status: 'online',
    });
    
    console.log('[SHADOW LINK] All systems operational. Ready to receive commands.');
  },
};