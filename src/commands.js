const common = require('./utils/common')
const math   = require('./utils/math')

/**
 * Adds commands to the message event listener.
 *
 * TODO:
 * - command aliases
 * - refactoring
 *
 */
const add = (msg) => {
  /**
   * COMMAND: !tableflip
   */
  if (msg.content === '!tableflip') {
    msg.channel.send('(╯°□°）╯︵ ┻━┻')
  }


  /**
   * COMMAND: !tableunflip
   */
  else if (msg.content === '!tableunflip') {
    msg.channel.send('┬─┬ ノ( ゜-゜ノ)')
  }


  /**
   * COMMAND: !8ball <question>
   */
  else if (msg.content.startsWith('!8ball')) {
    const question = msg.content.replace('!8ball', '').trim()
    const answer = [
      'As I see it, yes.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Don’t count on it.',
      'It is certain.',
      'It is decidedly so.',
      'Most likely.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Outlook good.',
      'Reply hazy, try again.',
      'Signs point to yes.',
      'Very doubtful.',
      'Without a doubt.',
      'Yes.',
      'Yes – definitely.',
      'You may rely on it.'
    ]
    const result = math.getRandomInt(0, answer.length - 1)

    // Make sure question is not empty.
    if ('' === question) {
      msg.channel.send('Missing parameter: You didn\'t ask a question! :rage:\n Example: `!8ball Will I pass my next exam?`')
    } else {
      msg.channel.send('**' + question + '**\n:8ball: ' + answer[result] + ' :8ball:')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "8ball" command... The answer was: "' + answer[result] + '"')
    }
  }


  /**
   * COMMAND: !spiritanimal
   *
   * Tells you which your spirit animal is (randomly).
   */
  else if (msg.content === '!spiritanimal') {
    // Source https://www.spiritanimal.info/
    // TODO: Add a small images/emotes?
    // TODO: Add a short description/adjective list to each animal?
    //   Ex: Cat: Patient, independent, adventurous, curious.
    const answer = [
      'Bat',
      'Bear',
      'Butterfly',
      'Cat',
      'Cougar',
      'Coyote',
      'Crow',
      'Deer',
      'Dog',
      'Dolphin',
      'Dragon',
      'Dragonfly',
      'Eagle',
      'Fox',
      'Frog',
      'Hawk',
      'Horse',
      'Hummingbird',
      'Jaguar',
      'Lion',
      'Rabbit',
      'Racoon',
      'Raven',
      'Sheep',
      'Snake',
      'Spider',
      'Swan',
      'Tiger',
      'Turkey',
      'Turtle',
      'Whale',
      'Wolf'
    ]
    const result = math.getRandomInt(0, answer.length - 1)

    msg.channel.send(msg.author.username + '\'s spirit animal is the ' + answer[result] + '!')
    console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "8ball" command... The answer was: "' + answer[result] + '"')
  }


  /**
   * COMMAND: !rate <subject>
   *
   * Description: Rate someone/something randomly from 0 to 10.
   * TODO: Needs random intros.
   */
  else if (msg.content.startsWith('!rate')) {
    const rating = math.getRandomInt(0, 10)
    let subject = msg.content.replace('!rate', '').trim()
    // Remove user mentions, experimental.
    if (subject.startsWith('<@')) {
      // Get username of first mention (ignore the rest if more than one).
      for (var [key, value] of msg.mentions.users) {
        subject = value.username
        break
      }
    }

    const emotes_array = [
      ':bar_chart:',
      ':chart_with_upwards_trend:',
      ':chart_with_downwards_trend:'
    ]
    const emote = math.getRandomInt(0, emotes_array.length - 1)

    // Make sure a question was asked.
    if ('' === subject) {
      msg.channel.send('Missing parameter: You must specify who or what to rate! :rage:\nExample: `!rate Vanilla Pudding`')
    } else {
      msg.channel.send(emotes_array[emote] + ' Based on extensive research, **' + subject + '**\ gets a rating of **' + rating + '/10**!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "rate" command... The result was was: "' + rating + '"')
    }
  }


  /**
   * COMMAND: !hug <subject>
   *
   * Description: Hugs someone/something for a random amount of mississippis.
   * TODO: Emotes
   */
  else if (msg.content.startsWith('!hug')) {
    let subject = msg.content.replace('!hug', '').trim()
    // Remove user mentions, experimental.
    if (subject.startsWith('<@')) {
      // Get username of first mention (ignore the rest if more than one).
      for (var [key, value] of msg.mentions.users) {
        subject = value.username
        break
      }
    }

    const mississippis = math.getRandomFloat(0, 10)
    const emotes_array = [
      ':bar_chart:',
      ':chart_with_upwards_trend:',
      ':chart_with_downwards_trend:'
    ]
    const emote = math.getRandomInt(0, emotes_array.length - 1)


    // Make sure subject isn't empty.
    if ('' === subject) {
      msg.channel.send('Missing parameter: You must specify who you want to hug! :rage:\n Example: `!hug chat`')
    } else {
      msg.channel.send( emotes_array[emote] + ' ' + msg.author.username + ' hugs **' + subject + '** for ' + mississippis.toFixed(2) + ' mississippis!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "hug" command... The subject was ' + subject + ' (' + mississippis.toFixed(2) + ' mississippis)!')
    }
  }


  /**
   * COMMAND: !coin
   *
   * Throws a coin and show the result (heads or tails).
   */
  else if (msg.content === '!coin') {
    const heads = math.getRandomInt(0, 1)

    if (1 === heads) {
      msg.channel.send(msg.author.username + ' threw a coin... The result was **Heads**!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "coin" command... The result was Heads!')
    } else {
      msg.channel.send(msg.author.username + ' threw a coin... The result was **Tails**!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "coin" command... The result was Tails!')
    }
  }


  /**
   * COMMAND: !dice [sides]
   *
   * Throws a dice. By default it will be a 6 sided dice, but a different number can be added after the command.
   */
  else if (msg.content.startsWith('!dice')) {
    // Clean up user input and part integrer.
    let sides = msg.content.replace('!dice', '').trim()
    sides = sides.replace( /[^\d.]/g, '' )
    sides = parseInt(sides, 10)

    // If not a valid number or no number given default to 6 sides.
    if (!Number.isInteger(sides)) {
      sides = 6
    }

    // Throw the dice!
    const result = math.getRandomInt(0, sides)

    msg.channel.send(msg.author.username + ' threw a ' + sides + ' sided dice... The result was ' + result + '!')
    console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "dice" command... The result was ' + result + ' (d' + sides + ')!')
  }


  /**
   * COMMAND: !ban <subject>
   *
   * Bans a user or object for a random amount of time, from a few seconds to several years. If the ban is longer than a year the expiry date will also be shown.
   */
  else if (msg.content.startsWith('!ban')) {
    let subject = msg.content.replace('!ban', '').trim()
    subject     = subject.stripMention(subject, msg)

    // Max equals 10 years.
    const time = math.getRandomInt(0, 631139040).toFakeTimeString()
    const emotes_array = [
      ':hammer:',
      ':rage:',
      ':no_entry:',
      ':no_entry_sign:',
      ':door:'
    ]
    const emote = math.getRandomInt(0, emotes_array.length - 1)

    // Make sure a there is a subject.
    if ('' === subject) {
      msg.channel.send('Missing parameter: You must specify who or what to ban! :rage:\n Example: `!ban Mosquitoes`')
    } else {
      msg.channel.send( emotes_array[emote] + ' ' + msg.author.username + ' banned **' + subject + '** for ' + time + '')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "ban" command... The subject was ' + subject + ' (' + time + ')')
    }
  }


  /**
   * COMMAND: !heavenorhell [subject]
   *
   * Shows whether a user will go to heaven or hell, and the prediction accuracy. Subject can be omitted, if so the user what used the command will be used as subject.
   */
  else if (msg.content.startsWith('!heavenorhell')) {
    let subject = msg.content.replace('!heavenorhell', '').trim()
    subject     = subject.stripMention(subject, msg)

    const answer = [
      'The gods have decree...',
      'Apollo has determined...',
      'The jury has decided...',
      'The Dalai Lama has spoken...',
      'The prophecy has revealed...'
    ]
    const result = math.getRandomInt(0, answer.length - 1)
    const acuracy = math.getRandomFloat(0, 110).toFixed(2)

    let destiny = math.getRandomInt(0, 1)
    if (1 === destiny) {
      destiny = 'is going to heaven! :innocent:'
    } else {
      destiny = 'is going to hell! :flame:'
    }

    // Max equals 10 years.
    const time = math.getRandomInt(0, 631139040).toFakeTimeString()

    // Make sure a there is a subject.
    if ('' === subject) {
      msg.channel.send( answer[result] + '* ' + msg.author.username + ' **' + destiny + '**\n(_*actual prediction acuracy of ' + acuracy + '%_)')
    } else {
      msg.channel.send( answer[result] + '* ' + subject + ' **' + destiny + '**\n(_*actual prediction acuracy of ' + acuracy + '%_)')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "ban" command... The subject was ' + subject + ' (' + time + ')!')
    }
  }


  /**
   * COMMAND: !fine [sides]
   *
   * Fines someone with a random amount of money, in a random currency.
   */
  else if (msg.content.startsWith('!fine')) {
    let subject = msg.content.replace('!fine', '').trim()
    subject     = subject.stripMention(subject, msg)

    const emotes_array = [
      ':receipt:',
      ':money_with_wings:',
      ':moneybag:'
    ]
    const emote = math.getRandomInt(0, emotes_array.length - 1)

    // Max equals 10 years.
    let money = math.getRandomInt(0, 963113904000)
    const trim = math.getRandomInt(0, 9)
    money = parseInt(money.toString().substring(trim), 10)
    // Round to two decimals and format number, ex: 12,345.67
    money = money / 100 // Get two decimals
    money = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

    const currency_array = [
      'USD',
      'Euros',
      'Pounds',
      'Swiss Francs',
      'Japanese Yen',
      'Swedish Krona',
      'Hyrule Rupees',
      'Gold bars'
    ]
    const currency = math.getRandomInt(0, currency_array.length - 1)

    // Make sure a there is a subject.
    if ('' === subject) {
      msg.channel.send('Missing parameter: You must specify who you want to fine! :rage:\n Example: `!fine Konami`')
    } else {
      msg.channel.send( emotes_array[emote] + ' ' + msg.author.username + ' fined **' + subject + '** with ' + money + ' ' + currency_array[currency] + '!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "fine" command... The subject was ' + subject + ' (' + money + ' ' + currency_array[currency] + ')!')
    }
  }


  /**
   * COMMAND: !love <subject>
   *
   * Show how much you love someone or something, with a random percentage.
   */
  else if (msg.content.startsWith('!love')) {
    let subject = msg.content.replace('!love', '').trim()
    subject     = subject.stripMention(subject, msg)

    // Check required parameters.
    if ('' === subject) {
      msg.channel.send('Missing parameter: You didn\'t specify the subject of your love! :rage:\nExample: `!love Fish & Chips`')
    } else {
      const result = math.getRandomInt(0, 110)

      if (94 < result) {
        msg.channel.send(':cupid: What!? ' + msg.author.username + ' Love for **' + subject + '** is _**' + result + '%**_!')
      } else if (69 < result) {
        msg.channel.send(':heart_eyes: Wow! ' + msg.author.username + ' love for **' + subject + '** is **' + result + '%**!')
      } else if (49 < result) {
        msg.channel.send(':thinking: ' + msg.author.username + ' Love for **' + subject + '** is ' + result + '%.')
      } else if (9 < result) {
        msg.channel.send(':weary: Oh... ' + msg.author.username + ' love for **' + subject + '** is ' + result + '%.')
      } else {
        msg.channel.send(':neutral_face: Oh, wow... ' + msg.author.username + ' love for **' + subject + '** is ' + result + '%.')
      }

      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "love" command... The result was ' + result + ' for ' + subject + '!')
    }
  }


  /**
   * COMMAND: !choose <option 1/option 2/...>
   *
   * Helps you choose between two or more options. Options must be separated by a forward slash.
   *
   * TODO: Trim choosen option?
   */
  else if (msg.content.startsWith('!choose')) {
    let choices = msg.content.replace('!choose', '').trim()
    choices = choices.split('/')
    random = math.getRandomInt(0, choices.length -1)

    const emote_array = [
      ':bar_chart:',
      ':confetti_ball:',
      ':bulb:',
      ':scales:',
      ':fortune_cookie:'
    ]
    const emote = math.getRandomInt(0, emote_array.length - 1)

    const intro_array = [
      'The correct choice is',
      'Well, obviously',
      'Maybe',
      'Gotta go with',
      'Ehh.. let\'s just say',
      'And the winner is...',
      'Ok, how about'
    ]
    const intro = math.getRandomInt(0, intro_array.length - 1)

    // Check required parameters.
    if (2 > choices.length) {
      msg.channel.send('Invalid parameter: You need two or more choices! :rage:\nExample: `!choose The Doors/David Bowie/Queen`')
    } else {
      msg.channel.send(emote_array[emote] + ' ' + intro_array[intro] + ' **' + choices[random].trim() + '**!')
      console.log('(' + msg.author.tag+ ') ' + msg.author.username + ' used "choose" command... The result was ' + choices[random].trim() + '!')
    }
  }
}

module.exports = { add }
