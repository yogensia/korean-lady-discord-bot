# KoreanLady Discord Bot

## About

**KoreanLady** is a Discord bot coded in NodeJS using the [Discord.JS](https://discord.js.org/#/) library.

It's meant to be a simple bot with a few fun commands and no moderation or any other advanced functions.

## Command List

### `!8ball <question>`

Uses an 8 ball to answer a question.

Usage: `!8ball Will I pass my next exam?`

### `!ban <subject>`

Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.

Usage: `!ban Mosquitoes` `!ban @Batman`

### `!choose <option 1/option 2/...>`

Helps you choose between two or more options. Options must be separated by a forward slash.

Usage: `!choose The Doors/David Bowie/Queen`

### `!coin`

Throws a coin and shows the result (heads or tails).

Usage: `!coin`

### `!dice`

Throws a dice. By default it will be a 6 sided dice, but a different number can be added after the command.

Usage: `!dice` `!dice 12`

### `!fine <subject>`

Fines someone with a random amount of money, in a random currency.

Usage: `!fine @Superman` `!fine The whole planet`

### `!heavenorhell [subject]`

Shows whether a user will go to heaven or hell, and the prediction accuracy. Subject can be omitted, if so the user what used the command will be used as subject.

Usage: `!heavenorhell` `!heavenorhell Pineapple`

### `!hug <subject>`

Hugs someone/something for a random amount of mississippis.

Usage: `!hug chat`

### `!love`

Shows how much you love someone or something, with a random percentage.

Usage: `!love @Wumpus` `!love everyone in chat`

### `!rate <subject>`

Rates someone/something randomly from 0 to 10.

Usage: `!rate Vanilla Pudding`

### `!spiritanimal`

Tells you which your spirit animal is (randomly).

Usage: `!spiritanimal`

### `!tableflip`

Flips a table on your behalf.

Usage: `!fliptable`

### `!tableunflip`

Puts the table back where it belongs.

Usage: `!tableunflip`


## Requirements

KoreanLady requires NodeJS, [Discord.JS](https://discord.js.org/#/) & [Enmap](https://enmap.evie.dev/).

[npm](https://www.npmjs.com/get-npm) & [Nodemon](https://nodemon.io/) are optional but recommended for easier setup and development.

You will also need to [create a Discord bot application](https://discordapp.com/developers/applications/me) so that your bot can connect to Discord, more instructions can be found below.


## Download

**[You can download the source code for KoreanLady from this link](https://github.com/yogensia/korean-lady-discord-bot/archive/master.zip)**.


## Running

The source is in the `src` directory.

1. First of all you'll need to [create a Discord bot application](https://discordapp.com/developers/applications/me).

2. Find the token for your application, should be found in the Bot section.

3. Edit `src/index.js` and add the token for your discord bot at the end of the file, in `client.login()`. Remember to keep this token private!

4. Run the source with `npm run build` or `npm run dev`. The second option requires [nodemon](https://nodemon.io/) and is used to monitor changes and reload the script as needed.

5. Go to the OAuth2 section in your bot application page. Enable the bot scope and select the permissions you need. This will create a link for you with your application's `client_id` and permissions. Copy and open that link, and follow instructions on the newly opened page to add your Bot to a server you have admin access to.

6. You should now find your bot online in your server, responding to your commands.

## Changelog

All notable changes for each version of this project are documented in the [changelog](https://github.com/yogensia/korean-lady-discord-bot/CHANGELOG.md).


## Credits & Acknowledgments

KoreanLady is written in NodeJS by [Yogensia](https://www.yogensia.com).

The name KoreanLady and some of the bot's commands are inspired by [Twitch Streamer Apollolol](https://www.twitch.tv/apollolol)'s community.


## License

Copyright (c) 2019, Yogensia

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