// Guild Member Add Event - Handles welcome messages
const { Events } = require('discord.js');
const { createEmbed } = require('../utils/embedBuilder');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    try {
      // Find a suitable welcome channel (system channel or first text channel)
      const welcomeChannel = member.guild.systemChannel || 
        member.guild.channels.cache.find(channel => 
          channel.type === 0 && channel.permissionsFor(member.guild.members.me).has('SendMessages')
        );
      
      if (!welcomeChannel) return;
      
      // Create welcome embed
      const welcomeEmbed = createEmbed({
        title: 'NEW OPERATIVE DETECTED',
        description: `Welcome to Shadow Corporation, ${member}. Your presence has been logged in our systems.`,
        color: 0x2f3136,
        thumbnail: member.user.displayAvatarURL({ dynamic: true }),
        fields: [
          {
            name: 'REGISTRATION',
            value: `You are operative #${member.guild.memberCount} to join our ranks.`,
            inline: true
          },
          {
            name: 'NEXT STEPS',
            value: 'Review the mission briefings and await further instructions.',
            inline: true
          }
        ],
        footer: 'SHADOW LINK v1.0 - RECRUITMENT PROTOCOL'
      });
      
      await welcomeChannel.send({ embeds: [welcomeEmbed] });
    } catch (error) {
      console.error('Error sending welcome message:', error);
    }
  },
};