# Change Log

All notable changes for each version of this project are documented in this file.

## 1.4.8 - 2021-03-16

- Add new fortunes to !fortune command.

## 1.4.7 - 2020-12-26

- Improve string detection by splitting question/exclamation marks before search.
- Add "cats" string response.

## 1.4.6 - 2020-12-07

- Add new fortunes to !fortune command.

## 1.4.5 - 2020-11-29

- Refactor !fortune command to better address repeated fortunes.
- Revert pum auto reply back to normal.

## 1.4.4 - 2020-11-19

- Update !fortune command to iterate through all fortunes before repeating them.

## 1.4.3 - 2020-11-05

- Update !track command to allow marking shows as completed.

## 1.4.2 - 2020-10-04

- Fix error message and suggestions in !track when a show requested by user isn't found.
- Fix !track set (show) adding new shows when they don't already exist.
- Make !track command read-only in DMs to reduce the possibility of tampering.

## 1.4.1 - 2020-10-01

- Add ability to rename shows in !track command.
- Refactor several commands to use simplified sendEmbed() method.
- Update formatting or message responses in !birthday command.

## 1.4.0 - 2020-09-30

- Add !track command to allow tracking watched episodes.

## 1.3.3 - 2020-09-27

- Add upcoming birthday argument to the !birthday command.
- Refactor !birthday command.

## 1.3.2 - 2020-09-23

- Update birthday cron job to notify server owner.
- Fix typos and formatting in several files.
- Update documentation and readme files.

## 1.3.1 - 2020-09-20

- Update auto responders emotes.
- Update !movienight description and embed.

## 1.3.0 - 2020-09-20

- Add PostgreSQL database.
- Add cron job support.
- Add birthday tracking and !birthday command.
- Add !movienight command that links to some basic info, tips & troubleshooting about movie nights, voting and Discord screen-share.
- Remove message embeds where they were not really needed to reduce clutter.

## 1.2.10 - 2020-09-08

- Improve error handling in !anime command.

## 1.2.9 - 2020-08-01

- Fix letter case variations breaking string auto responder.

## 1.2.8 - 2020-07-31

- Refactor string auto-responses in message event handler.

## 1.2.7 - 2020-07-24

- Add first set of spam related features.
  - Commands can now be marked as "spam".
  - Spam commands must be used in the designated spam channel.
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
