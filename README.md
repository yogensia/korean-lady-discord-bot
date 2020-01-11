# KoreanLady Discord Bot

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
 [![ISC License](https://img.shields.io/badge/license-ISC-green)](https://github.com/yogensia/VSCodeSearchWPDocs/blob/master/LICENSE.md) ![](https://img.shields.io/github/package-json/v/yogensia/korean-lady-discord-bot)

**KoreanLady** is a Discord bot coded in NodeJS using the [Discord.JS](https://discord.js.org/#/) library.

It's meant to be a simple bot with a few fun commands and no moderation or any other advanced functions.

## Command List

You can find the [full list of available commands here](https://github.com/yogensia/korean-lady-discord-bot/blob/master/COMMANDS.md#koreanlady-discord-bot).

## Building requirements

KoreanLady requires NodeJS, [npm](https://www.npmjs.com/get-npm), [Discord.JS](https://discord.js.org/#/) & [Enmap](https://enmap.evie.dev/).

[Nodemon](https://nodemon.io/) is optional but recommended for easier setup and development.

You will also need to [create a Discord bot application](https://discordapp.com/developers/applications/me) so that your bot can connect to Discord, more instructions can be found below.

## Download

[You can download the source code for KoreanLady Discord Bot from this link](https://github.com/yogensia/korean-lady-discord-bot/archive/master.zip).

Or:

```
git clone https://github.com/yogensia/korean-lady-discord-bot.git
cd korean-lady-discord-bot
npm install
```

## Building & creating your own bot

This bot is open source so that anyone can download it, modify it and run it.

### Outline

You can find the source code in the `src` directory.

- `index.js` Initializes the bot and loads events/commands, which are found in their own subfolders.
- `src/events/messages.js` handles the message event and runs the according command if applicable.
- `src/utils/` contains some utility functions to make some repetitive tasks a bit easier and cleaner. This includes a basic [Twitch API (helix)](https://dev.twitch.tv/docs/api) request function.
- `/scripts/` is meant for additional utilities, like building the command list documentation.
- Each command has a simple set of properties: `name`, `description`, `usage`, `aliases`, etc. that are used by the bot to show help or detailed error messages when necessary aw well as define required arguments.
- Most of the commands are generic enough, but you decide to create your own fork of this bot, you may want to check the commands one by one and replace a few things, like emotes etc.

If you are new to making bots you can check [discordjs.guide](https://discordjs.guide/) and/or [anidiots.guide](https://anidiots.guide/) for lots of documentation and resources.

### Getting Started

To get started using this repo follow these steps:

1. First of all you'll need to [create a Discord bot application](https://discordapp.com/developers/applications/me).

2. Go to the OAuth2 section in your bot application page. Enable the bot scope and select the permissions you need. This will create a link for you with your application's `client_id` and permissions. Copy and open that link, and follow instructions on the newly opened page to add your Bot to a server you have admin access to.

3. Find the token for your application, should be found in the Bot section.

4. Rename `.env.example` to `.env` and add the token for your discord bot in this file. Remember to keep this token private!

5. Run `npm install` on the directory with the projects files if you haven't already to install dependencies.

6. Run the source with `npm run start` or `npm run dev`. The second option requires [nodemon](https://nodemon.io/) and is used to monitor changes and reload the script as needed.

7. You should now find your bot online in your server, responding to your commands.

## Changelog

All notable changes for each version of this project are documented in the [changelog](https://github.com/yogensia/korean-lady-discord-bot/CHANGELOG.md).

## Credits & Acknowledgments

KoreanLady is written in NodeJS by [Yogensia](https://www.yogensia.com).

Some of this bot's architecture is based on documentation from [discordjs.guide](https://discordjs.guide/) & [anidiots.guide](https://anidiots.guide/).

The name KoreanLady and some of the bot's commands are inspired by [Twitch Streamer Apollolol](https://www.twitch.tv/apollolol)'s community.

## License

Copyright (c) 2019—2020, Yogensia

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

Source: http://opensource.org/licenses/ISC