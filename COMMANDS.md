# KoreanLady Discord Bot

## About

**KoreanLady** is a Discord bot coded in NodeJS using the [Discord.JS](https://discord.js.org/#/) library.

It's meant to be a simple bot with a few fun commands and no moderation or any other advanced functions.

## Command List

Below you can see the full list of available commands.

Some commands require an argument, like naming a user or object, while others don't. Please check the various usage examples to see what's possible!

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

### `!help`

Shows a link to command list in documentation.

Usage: `!help`

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