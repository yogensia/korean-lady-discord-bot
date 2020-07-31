# Change Log

All notable changes for each version of this project are documented in this file.

## 1.2.8 - 2020-07-31

- Refactor string auto-responses in message event handler.

## 1.2.7 - 2020-07-24

- Add first set of spam related features.
  - Commands can now be marked as "spammy".
  - Spammy commands must be used in the designated spam channel.
  - When used in other channels a notice will be shown to the user.
- Make reactWithCustomEmote function asynchronous.

## 1.2.6 - 2020-07-15

- Add "lidu strim when?" responses.
- Fix typo in !fight command.

## 1.2.5 - 2020-07-14

- Fix emotes not working after a while in some commands.

## 1.2.4 - 2020-07-13

- Refactor several commands slightly and improve random subject strings.

## 1.2.3 - 2020-07-13

- Adjust !fight command for slightly shorter fights.
- Add some potatoes to the !8ball command.

## 1.2.2 - 2020-07-09

- Improve KoreanLady mention detection.

## 1.2.1 - 2020-07-03

- Add "pum strim when?" responses.

## 1.2.0 - 2020-06-29

- Add !anime command.
- Improve movie descriptions in !movie command.
- Fix typos and other minor issues.
- Make subject optional in !ban, !fight, !fine, !hug, !love and !slap commands No subject equals "everyone".

## 1.1.2 - 2020-04-10

- Add filtering by year to !show command.

## 1.1.1 - 2020-04-10

- Add filtering by year to !movie command.

## 1.1.0 - 2020-04-09

- Add !movie & !show commands.
- Migrate to Discord.JS v12.1.1.
- Fix handling of user display names in DMs.

## 1.0.5 - 2020-03-12

- Improve handling of user display names.

## 1.0.4 - 2020-03-12

- Show current nickname instead of username in fight command.
- Tweaked formatting on fights when fighting oneself.
- Fix !dice command being able to roll 0.
- Tweaked date formatting in !ban command.

## 1.0.3 - 2020-03-07

- Add new attacks to !fight.

## 1.0.2 - 2020-03-05

- Allow use of uppercase prefix.

## 1.0.1 - 2020-03-05

- Fix double user mentions in !8ball.

## 1.0.0 - 2020-02-21

- Push v1.0.0.

## 0.1.0 - 2019-12-17

- Initial pre-release.
