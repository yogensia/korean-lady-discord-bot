# KoreanLady Discord Bot

KoreanLady is a simple Discord bot with a few fun commands.

Please remember to not use it to spam the server, if you're going to use it a lot make sure to do so in the spam channel, thanks!

## Command List

Below you can see the full list of available commands.

Some commands require an argument (shown surrounded by chevrons `<` & `>`), like naming a user or object. Other commands accept optional arguments (shown surrounded by brackets `[` & `]`), while others don't require any arguments at all.

Please check the examples provided to see what each command can do!

### `k!8ball`

Uses an 8 ball to answer a question.

Usage: `k!8ball <question>`

Examples: `k!8ball Will I pass my exam?`

### `k!anime`

Returns info about an anime. The command will always try to find the best match, but providing a full title is still recommended for best results. Filtering by year is not supported.

Usage: `k!anime <anime title>`

Examples: `k!anime Hinamatsuri`

### `k!ban`

Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.

Usage: `k!ban [subject]`

Examples: `k!ban` `k!ban Mosquitoes` `k!ban @Batman`

### `k!birthday`

Allows a user to set or unset their birthday date, or see a list of upcoming birthdays. if no argument is provided, the bot will show the user's current birthday date, if it is present in the database.

The bot will send a notification on chat at 8 AM CET whenever it's someone's birthday.

When adding your birthday date, please use the format DD/MM.

Usage: `k!birthday [set DD/MM|unset|upcoming]`

Examples: `k!birthday` `k!birthday set 31/12` `k!birthday unset` `k!birthday upcoming`

Aliases: `k!bday` `k!bd`

### `k!coin`

Throws a coin and shows the result (heads or tails).

Usage: `k!coin`

Aliases: `k!headsortails`

### `k!dice`

Throws a dice. By default it will be a 6 sided dice, but a different number can be added after the command.

Usage: `k!dice [sides]`

Examples: `k!dice` `k!dice 12`

### `k!fight`

Start a fight with someone.

Characters start with 150HP and take turns to attack. Attacks are selected randomly, and their damage multiplier is also rolled randomly each turn. Each attack has a different accuracy and critical hit chance. The first fighter that runs out of HP loses.

Usage: `k!fight [subject]`

Examples: `k!fight` `k!fight Loch Ness Monster` `k!fight @Batman`

Aliases: `k!battle`

Notice: This command is considered spam and can only be used in the spam channel.

### `k!fine`

Fines someone with a random amount of money, in a random currency.

Usage: `k!fine [subject]`

Examples: `k!fine` `k!fine @Superman` `k!fine The whole planet`

### `k!fortune`

Get a fortune! For best results, get a snack first, break it in half, then use this command.

Usage: `k!fortune`

Examples: `k!fortune`

Aliases: `k!fortunecookie`

### `k!help`

Shows a link to command list in documentation. If a command is added as an argument, it will show help specific to that command.

Usage: `k!help [command]`

Examples: `k!help` `k!help ban`

Aliases: `k!h` `k!?` `k!info`

### `k!hug`

Hugs someone/something for a random amount of mississippis.

Usage: `k!hug [subject]`

Examples: `k!hug` `k!hug chat`

### `k!list`

Lists all available commands.

Usage: `k!list`

Aliases: `k!commands` `k!commandlist`

### `k!love`

Shows how much you love someone or something, with a random percentage.

Usage: `k!love [subject]`

Examples: `k!love` `k!love @Wumpus` `k!love everyone in chat`

### `k!movie`

Returns info about a movie. The command will always try to find the best match, but providing a full title is still recommended for best results. You can refine your search by typing the year between parethesis.

Usage: `k!movie <movie title>`

Examples: `k!movie Alien` `k!movie Total Recall (1990)`

### `k!movienight`

Shows a link with information, tips & troubleshooting regarding movie night.

Usage: `k!movienight`

Aliases: `k!movies` `k!mn`

### `k!owo`

Twanswates y-youw text t-to OwO speak! Pwease use wesponsibwy, hehe.

Usage: `k!owo <text>`

Examples: `k!owo A loyal warrior will rarely worry why we rule.`

Aliases: `k!owoify` `k!owify`

### `k!ping`

Simple ping command to test bot is online.

Usage: `k!ping`

### `k!show`

Returns info about a TV show. The command will always try to find the best match, but providing a full title is still recommended for best results. You can refine your search by typing the year between parethesis.

Usage: `k!show <show title>`

Examples: `k!show The Witcher` `k!show Doctor Who (1963)`

### `k!slap`

Lets you slap your nemeses, and shows how much damage you've inflicted.

Usage: `k!slap [subject]`

Examples: `k!slap` `k!slap @Cthulhu` `k!slap everyone in chat`

### `k!timezones`

Show the current time in several cities of different timezones.

Usage: `k!timezones`

Aliases: `k!timezone` `k!tz`

### `k!track`

Keeps track of how many episodes have been watched for a show. You can check usage and examples below for how to add new tracked shows, change, or check the amount of episodes watched, or delete them from the database.

When providing a show name, capitalization is ignored, so `HxH` and `hxh` will work just the same. Show names can't contain spaces and should be short an easy to remember, so acronyms and similar short names are recommened.

 To see a list of shows currently tracked type the command without any arguments.

Usage: `k!track [(show)|add (show)|set (show) (eps)|del (show)]`

Examples: `k!track` `k!track HxH` `k!track add HxH` `k!track set HxH 120` `k!track del HxH`

Aliases: `k!trackshow` `k!ts`

### `k!treat`

Give someone a treat. If no subject is provided, the treat will be for everyone!

Treats are randomly generated by a super secret special algorithm, only with the highest quality ingredients. By being gifted a treat you enter a non-negotiable contract and are legally obligated to stop what you are doing and eat. Treats may contain traces of pineapple.

Usage: `k!treat [subject]`

Examples: `k!treat` `k!treat @KoreanLady` `k!treat the queen of England`

Aliases: `k!dessert`
