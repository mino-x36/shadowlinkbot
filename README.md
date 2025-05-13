# Shadow Link Discord Bot

A sci-fi military-style Discord bot for the Shadow Corporation. This bot provides a range of slash commands and automated messages with a dark, serious tone fitting for a high-tech AI assistant from a secret military organization.

## Features

- **Slash Commands:**
  - `/status [message]` - Sets the bot's custom status message
  - `/announce [channel] [title] [message]` - Sends an announcement to a specific channel
  - `/mission [details]` - Posts a formatted mission briefing
  - `/rank [user]` - Returns a user's current role/rank in the server

- **Automated Messages:**
  - Welcome message when a user joins
  - Regular announcements (every 6 hours by default)

- **Role-based permissions:**
  - Only users with admin roles can run sensitive commands

## Setup Instructions

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
   ```
   TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   ADMIN_ROLE_ID=your_admin_role_id_here
   ```
4. Deploy the slash commands with `npm run deploy`
5. Start the bot with `npm start`

## Command Usage

### /status

Sets the bot's custom status message. Requires administrator permissions.

### /announce

Sends an announcement to a specific channel. Requires administrator permissions.

### /mission

Posts a formatted mission briefing with title, objective, details, and status. Requires message management permissions.

### /rank

Displays the roles and rank information for a user. If no user is specified, displays information for the command user.

## License

This project is licensed under the MIT License - see the LICENSE file for details.