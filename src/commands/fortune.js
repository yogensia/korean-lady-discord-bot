const common = require('../utils/common')
const math = require('../utils/math')

// Fortunes.
let previousFortunes = []
let fortunes = [
  // Random and fun (https://www.boredpanda.com/funny-fortune-cookie-messages/, adapted).
  'Run.',
  'The next fortune cookie will give you\nthe answer you seek. For real!',
  'Ignore the previous fortune cookie.',
  'Someone\'s looking up to you.\nDon\'t let them down.',
  'Virtual fortunes are just as good,\nas long as the cookie is real.',
  'If nobody sees you eat something,\ndoes it have any calories?',
  'Always finish what you st',
  'Ask not what your fortune cookie can do for you,\nbut what you can do for your fortune cookie.',
  'Three can keep a secret,\nif one gets rid of the other two.',
  'Peace was never an option.',
  'Your efforts will not go unnoticed.',
  'Never gonna give you up,\nnever gonna let you down.',
  'When life gives you lemons, don\'t make lemonade!\nMake life take the lemons back! Get mad!',
  'That that is, is. That that is not, is not. Is that it? It is.\nThat that is, is that that is. Not is not. Is that it? It is.\nThat that is, is that that is not. Is not "is that" it? It is.\nThat that is, is that that is not, "is not." Is that it? It is.',
  'Beware the Jabberwock, my son!\nThe jaws that bite, the claws that catch!',
  'Your lucky numbers:\n4, 8, 15, 16, 23 and 42',
  'Your pet has not forgotten and will not forgive,\nuntil an offering or a sacrifice is given.',
  'Your pet is planning to eat you.',
  'You will gain no wisdom from this virtual cookie.',
  'You are doing a good job.\nYou will be rewarded sooner than you think.',
  'Virtual cookies have zero calories.',
  'The key to making the world a better place,\nyou will find in your pocket.',
  'Virtual fortiune cookies can\'t have printing errors,\nbut they still can have typos.',
  'The smart thing would be to prepare\nfor the unexpected.',
  'You will soon discover a hidden talent of yours.',
  'Error 404 - Fortune not found.',
  'You broke a cookie that you can\'t eat for this fortune.\nWas it worth it? The answer is no.',
  'Your next fortune will become true. And by true I mean false.\nIt\'s all lies. But they are entertaining lies.\nAnd in the end isn\'t that the real truth?\nThe answer is: No.',
  'Disregard other fortune cookies, only pay attention to this fortune cookie:\nYou are awesome.',
  'Something wonderful is about to happy.\nSent from my iPhone.',
  'Plan to be spontaneos tomorrow.',

  // Random and fun (google image search, no attribution).
  'To truly find yourself,\nyou should play hide an seek alone.',
  'The fortune you seek is in another cookie.',
  'About time I got out of that cookie.',
  'The early bird gets the worm,\nand the second mouse gets the cheese.',
  'Cookie Notice: This fortune uses cookies to ensure you get the best possible experience.',
  'Don\'t be mean and keep it clean.',
  'Borrow money from pessimists,\nthey won\'t expect it back.',
  'It\'s amazing how much good you can do,\nif you don\'t care who gets the credit.',
  'You should start thinking about marriage.\nIt will let you annoy one special person for the rest of your life.',
  'Don\'t even ask.',
  'You are not illiterate.',
  'You will be let down by a fortune cookie.',
  'Fortune not found, please retry.',
  'Don\'t ask a cookie what you can answer by yourself.',
  'You think it\'s a secret but they know.\nThey. Know.',

  // Wholesome.
  'Don\'t pursue happines.\nCreate it.',
  'You are an angel.\nBeware of those who collect feathers.',
  'Everybody feels happy for having you as a friend.',
  'Stand tall, don\'t look down upon yourself.',
  'Act well your part;\nthere the honor lies.',
  'Your choices at the moment\nwill be good ones. Trust yourself.',
  'You are an amazing person.',
  'You are awesome.',
  'Be kind, for everyone you meet is\nfighting their battle too.',
  'You will have a great day.',
  'Always have faith in yourself.',
  'Time heals all wounds.\nKeep your chin up.',
  'Do not step on anyone on your way\nto the top.',
  'Good character is better than outsatanding talent.',
  'Someone lovely is thinking of you.',
  'If you keep trying,\nfailure is just a step to success.',

  // Darkest Dungeon Ancestor (https://darkestdungeon.gamepedia.com/Narrator, adapted).
  'Leave nothing unchecked, there is much to be found in forgotten places.',
  'Make no mistake, you will face greater challenges. Preparation is key.',
  'Curiosity, interest, and obsession — mile markers on the road to damnation.',
  'A little hope, however desperate, is never without worth.',
  'Barbaric rage and unrelenting savagery make for a powerful ally.',
  'To fight the abyss, one must know it...',
  'The task ahead is terrible, and weakness cannot be tolerated.',
  'We fall so that we may learn to pick ourselves up once again.',
  'Where there is no peril in the task, there can be no glory in its accomplishment.',
  'Great adversity has a beauty - it is the fire that tempers the blade.',
  'The way is lit. The path is clear. You require only the strength to follow it.',
  'Great is the weapon that cuts on its own!',
  'The abyss returns even the boldest gaze.',
  'Frustration and fury, more destructive than a hundred cannons.',
  'There can be no hope in this hell, no hope at all.',
  'Those who covet injury will find it in no short supply.',
  'Seize this momentum! Push on to the task\'s end!',
  'Remind yourself that overconfidence is a slow and insidious killer.',

  // Common sayings (http://fortunecookieapi.herokuapp.com/v1/fortunes?limit=300).
  'A friend\'s frown is better than a fool\'s smile.',
  'A friend in need is a friend indeed.',
  'A friend is easier lost than found.',
  'A problem shared is a problem halved.',
  'False friends are worse than open enemies.',
  'To err is human; to forgive, divine.',
  'Love to live and live to love.',
  'True beauty lies within.',
  'Anger and hate hinder good counsel.',
  'Appearances are deceptive.',
  'Attack is the best form of defense.',
  'Be slow in choosing, but slower in changing.',
  'Do unto others as you would have them do to you.',
  'Open confession is good for the soul.',
  'Out of sight, out of mind.',
  'Patience is a virtue.',
  'Persuasion is better than force.',
  'Temper is so good a thing that we should never lose it.',
  'To the world you may be one person,\nbut to one person, you may be the world.',
  'Wondrous is the strength of cheerfulness.',
  'You made your bed, now you must lie in it.',
  'A good thing is all the sweeter when won with pain.',
  'All things come to those that wait.',
  'As one door closes, another always opens.',
  'As you go through life, make this your goal,\nwatch the doughnut and not the hole.',
  'Brevity is the soul of wit.',
  'Experience is the hardest teacher.\nShe gives the test first and the lesson afterwards.',
  'Fortune favours the brave.',
  'He who laughs last, laughs longest.',
  'Hope for the best and prepare for the worst.',
  'Leave tomorrow till tomorrow.',
  'Procrastination is the thief of time.',
  'While there\'s life there\'s hope.',
  'An apple a day keeps the doctor away,\nan onion a day keeps everyone away.',
  'Better late thrive than never do well.',
  'Don\'t bite the hand that feeds you.',
  'It is no use crying over spilt milk.',
  'If you don\'t say it you will not have to unsay it.',
  'Keep your mouth shut and your eyes open.',
  'Say what you mean and mean what you say.',
  'Speak clearly, if you speak at all.',
  'Stop beating around the bush.',
  'Accidents will happen.',
  'Don\'t knock on death\'s door,\nring the doorbell and run.',
  'Out of the frying pan into the fire.',
  'The darkest hour is before the dawn.',
  'Those who don\'t learn from history are doomed to repeat it.',
  'Where observation is concerned,\nchance favours only the prepared mind.',
  'You never know what you can do till you try.',
  'All work and no play makes Jack a dull boy.',
  'If at first you don\'t succeed, try, try again.',
  'If you can\'t help, don\'t hinder.',
  'If you see something you like, take it and make it better.',
  'Never put off \'til tomorrow what you can do today.',
  'A bird makes his nest little by little.',
  'Curiosity killed the cat.',
  'Curses, like chickens come home to roost.',
  'Don\'t count your chickens before they hatch.'
]

const run = (client, msg, args) => {
  // Check if we've ran out of fortunes, when that happens restore them.
  if (fortunes.length === 0) {
    fortunes = previousFortunes
    previousFortunes = []
  }

  // Random fortune.
  const fortune = math.getRandomStringFromArray(fortunes, false, previousFortunes)

  // Send fortune in an embed.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: fortune
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'fortune',
  desc: 'Get a fortune! For best results, get a snack first, break it in half, then use this command.',
  aliases: ['fortunecookie'],
  usage: 'fortune',
  examples: ['fortune'],
  run
}
