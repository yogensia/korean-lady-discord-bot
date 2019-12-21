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
  // Get random answer and description
  const answer_array = [
    ['Bat', 'Intuitive, understanding, truthful, traveler'],
    ['Bear', 'Strong, corageous, confident, inspiring, supportive'],
    ['Butterfly', 'Playful, transformative, joyful, bright'],
    ['Cat', 'Patient, Independent, adventurous, curious'],
    ['Cougar', 'Confident, wise, dependable, responsible'],
    ['Coyote', 'Adaptable, playful, trikster, cunning'],
    ['Crow', 'Intelligent, audacious, mischievous, adaptable'],
    ['Deer', 'Gentle, intuitive, graceful, assertive'],
    ['Dog', 'Loyal, protective, loving, playful'],
    ['Dolphin', 'Peaceful, playful, cooperative, protective'],
    ['Dragon', 'Wise, strong, inspiring, energetic'],
    ['Dragonfly', 'Atentive, joyful, adaptable, swift'],
    ['Eagle', 'Intuitive, corageous, resilient, determined'],
    ['Fox', 'Intuitive, cunning, resourceful, nocturnal'],
    ['Frog', 'Healthy, loving, adaptable, graceful'],
    ['Hawk', 'Observative, assertive, '],
    ['Horse', 'Description'],
    ['Hummingbird', 'Description'],
    ['Jaguar', 'Description'],
    ['Lion', 'Description'],
    ['Rabbit', 'Description'],
    ['Racoon', 'Description'],
    ['Raven', 'Description'],
    ['Sheep', 'Description'],
    ['Snake', 'Description'],
    ['Spider', 'Description'],
    ['Swan', 'Description'],
    ['Tiger', 'Description'],
    ['Turkey', 'Description'],
    ['Turtle', 'Description'],
    ['Whale', 'Description'],
    ['Wolf', 'Description']
  ]
  const answer = math.getRandomStringFromArray(answer_array)

  // Send message.
  msg.channel.send(`${msg.author.username}'s spirit animal is the **${answer[0]}**!\n${answer[1]}.`)
}
