# Discord360

A Discord bot leaderboard for your Life360 Circle. Idea from the Tik Tok from @verboseboot


## Usage

Due to the nature of the data involved, this system is done as one-bot-per-server for the time being, I currently do not host a public bot available for use.

Run the installation instructions below, invite the bot to your server, and get help by mentioning the bot and saying "help" with it. For example: `@Life360#0001 help`. The bot will then list out all the possible commands and leaderboards.

## Installation

You should have Node.JS installed. You will need a Discord bot token (possible at the [Discord's Developer Portal](https://discord.com/developers/applications)).

Invite your Discord bot to your server during any point in this process.

###**Step 1:** clone and install npm packages
```bash
git clone https://github.com/lholliger/discord360
cd discord360
npm install
```


###**Step 2:** create `.env`. This is where you will store the configuration

Required values:
```
AUTHORIZATION=Bearer XXXXXXXXXXX
CIRCLE=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
TOKEN=XXXXXXXXXX
UPDATES=0000000000000000
```
`AUTHORIZATION`: Your Life360 authorization header, found using `mitmproxy`, login coming soon

`CIRCLE` the ID for your life360 circle, follows the UUID format shown

`TOKEN` your private Discord bot token

`UPDATES` Discord channel ID to post updates such as low battery alerts or new records (soon)


###**Step 3:** run!
```bash
npm start
```
*Docker installation will be coming soon*