// Embed Builder - Creates consistent embeds for the bot
const { EmbedBuilder } = require('discord.js');

/**
 * Creates a formatted embed for Shadow Link messages
 * @param {Object} options - Configuration options for the embed
 * @param {string} options.title - The embed title
 * @param {string} options.description - The embed description
 * @param {number} options.color - The embed color (hexadecimal)
 * @param {boolean} options.timestamp - Whether to add a timestamp
 * @param {string} options.thumbnail - URL for the thumbnail image
 * @param {string} options.image - URL for the main image
 * @param {Array} options.fields - Array of field objects {name, value, inline}
 * @param {string} options.footer - Footer text
 * @param {string} options.footerIcon - URL for the footer icon
 * @returns {EmbedBuilder} The constructed embed
 */
function createEmbed(options) {
  const embed = new EmbedBuilder()
    .setColor(options.color || 0x2f3136);
  
  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);
  if (options.timestamp) embed.setTimestamp();
  if (options.fields && Array.isArray(options.fields)) {
    options.fields.forEach(field => {
      embed.addFields({
        name: field.name,
        value: field.value,
        inline: field.inline || false
      });
    });
  }
  
  if (options.footer) {
    embed.setFooter({ 
      text: options.footer,
      iconURL: options.footerIcon || null
    });
  }
  
  return embed;
}

module.exports = {
  createEmbed
};