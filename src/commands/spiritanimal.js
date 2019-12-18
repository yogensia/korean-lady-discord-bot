const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !spiritanimal
 *
 * Tells you which your spirit animal is (randomly).
 *
 * Source https://www.spiritanimal.info/
 */
exports.run = (client, msg, args) => {
  const answer = [
    'Bat|Intuitive, understanding, truthful, traveler.',
    'Bear|Strong, corageous, confident, inspiring, supportive.',
    'Butterfly|Playful, transformative, joyful, bright.',
    'Cat|Patient, Independent, adventurous, curious.',
    'Cougar|Confident, wise, dependable, responsible.',
    'Coyote|Adaptable, playful, trikster, cunning.',
    'Crow|Intelligent, audacious, mischievous, adaptable.',
    'Deer|Gentle, intuitive, graceful, assertive.',
    'Dog|Loyal, protective, loving, playful.',
    'Dolphin|Peaceful, playful, cooperative, protective.',
    'Dragon|Wise, strong, inspiring, energetic.',
    'Dragonfly|Atentive, joyful, adaptable, swift.',
    'Eagle|Intuitive, corageous, resilient, determined.',
    'Fox|Intuitive, cunning, resourceful, nocturnal.',
    'Frog|Healthy, loving, adaptable, graceful.',
    'Hawk|Observative, assertive, ',
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

  msg.channel.send(`${msg.author.username}'s spirit animal is the **${answer[result]}**!`)
}
