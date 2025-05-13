// Scheduled Messages - Handles periodic announcements
const cron = require('node-cron');
const { createEmbed } = require('./embedBuilder');

/**
 * Array of standard announcements that rotate
 */
const standardAnnouncements = [
  {
    title: 'SECURITY REMINDER',
    message: 'All operatives are reminded to follow security protocols at all times. Report any suspicious activity immediately.'
  },
  {
    title: 'SYSTEM INTEGRITY',
    message: 'Shadow Link systems operating at optimal capacity. All communication channels secure.'
  },
  {
    title: 'OPERATIONAL DIRECTIVE',
    message: 'Stay vigilant. Shadow Corporation expects excellence from all operatives.'
  },
  {
    title: 'PROTOCOL UPDATE',
    message: 'Review the latest mission briefings for updated operational protocols.'
  }
];

/**
 * Sets up scheduled announcements
 * @param {Client} client - The Discord client instance
 * @param {string} cronSchedule - Cron schedule expression (default: every 6 hours)
 */
function scheduleAnnouncements(client, cronSchedule = '0 */6 * * *') {
  cron.schedule(cronSchedule, async () => {
    try {
      // Find a suitable channel in each guild
      client.guilds.cache.forEach(async guild => {
        // Find the system channel or first available text channel
        const channel = guild.systemChannel || 
          guild.channels.cache.find(ch => 
            ch.type === 0 && ch.permissionsFor(guild.members.me).has('SendMessages')
          );
        
        if (!channel) return;
        
        // Pick a random announcement
        const announcement = standardAnnouncements[
          Math.floor(Math.random() * standardAnnouncements.length)
        ];
        
        // Create the announcement embed
        const announcementEmbed = createEmbed({
          title: announcement.title,
          description: announcement.message,
          color: 0x2f3136,
          timestamp: true,
          footer: 'SHADOW LINK v1.0 - AUTOMATED BROADCAST'
        });
        
        await channel.send({ embeds: [announcementEmbed] });
        console.log(`[INFO] Sent scheduled announcement to ${guild.name}`);
      });
    } catch (error) {
      console.error('Error sending scheduled announcement:', error);
    }
  });
}

module.exports = {
  scheduleAnnouncements
};