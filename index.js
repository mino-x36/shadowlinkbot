const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Shadow Link ready. Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
