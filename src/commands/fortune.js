const math = require('../utils/math')

const run = (client, msg, args) => {
  // Ramdom fortune.
  const fortunes = [
    // Random and fun (https://www.boredpanda.com/funny-fortune-cookie-messages/, adapted)
    'Run.',
    'The next fortune cookie will give you\nthe answer you seek. For real!',
    'Ignore previous fortune cookie.',
    'Someone\'s looking up to you.\nDon\'t let them down.',
    'Virtual fortunes are just as good,\nas long as the cookie is real.',
    'If nobody sees you eat something,\ndoes it have any calories?',
    'Always finish what you st',
    'Ask not what your fortune cookie can do for you,\nbut what you can do for your fortune cookie.',
    'Three can keep a secret,\nif one gets rid of the other two.',
    'Peace will never be an option.',
    'Your efforts will not go unnoticed.',
    'Never gonna give you up,\nnever gonna let you down.',
    'When life gives you lemons (which it will), don\'t make lemonade!\nMake life take the lemons back! Get mad!',
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
    '404 - Error, fortune not found.',
    'You broke a cookie that you can\'t eat for this fortune.\nWas it worth it? The answer is no.',
    'Your next fortune will become true. And by true I mean false.\nIt\'s all lies. But they are entertaining lies.\nAnd in the end isn\'t that the real truth?\nThe answer is: No.',
    'Disregard other fortune cookies, only listen to this fortune cookie:\nYou are awesome.',
    'Something wonderful is about to happy.\nSent from my iPhone.',
    'Plan to be spontaneos tomorrow.',

    // Random and fun (google image search, no attribution)
    'To truly find yourself,\nyou should play hide an seek alone.',
    'The fortune you seek is in another cookie.',
    'About time I got out of that cookie.',
    'The early bird gets the worm,\nand the second mouse gets the cheese.',
    'Cookie Notice: This fortune uses cookies to ensure you get the best eperience possible.',
    'Don\'t be mean and keep it clean.',
    'Borrow money from pessimists,\nthey won\'t expect it back.',
    'It\'s amazing how much good you can do,\nif you don\'t care who gets the credit.',
    'Marriage will let you annoy one special person for the rest of your life.',
    'Don\'t even ask.',
    'You are not illiterate.',
    'You will be let down by a fortune cookie.',
    'Fortune not found, please retry.',
    'Don\'t ask a cookie what you can answer by yourself.',
    'You think it\'s a secret but they know. They. Know.',

    // Darkest Dungeon Ancestor (https://darkestdungeon.gamepedia.com/Narrator, adapted)
    'Leave nothing unchecked, there is much to be found in forgotten places.',
    'Make no mistake, you will face greater challenges. Preparation is key.',
    'Curiosity, interest, and obsession — mile markers on the road to damnation.',
    'Let me share with you the terrible wonders I have come to know...\n(continued in the next fortune cookie)',
    'A little hope, however desperate, is never without worth.',
    'Barbaric rage and unrelenting savagery make for a powerful ally.',
    'To fight the abyss, one must know it...',
    'The task ahead is terrible, and weakness cannot be tolerated.',
    'We fall so that we may learn to pick ourselves up once again.',
    'Where there is no peril in the task, there can be no glory in its accomplishment.',
    'Great adversity has a beauty - it is the fire that tempers the blade.',
    'The way is lit. The path is clear. You require only the strength to follow it.',
    'As the light gains purchase, spirits are lifted and purpose is made clear.',
    'Confidence surges as the enemy crumbles!',
    'Continue the onslaught! Destroy. Them. All.',
    'Great is the weapon that cuts on its own!',
    'The abyss returns even the boldest gaze.',
    'Frustration and fury, more destructive than a hundred cannons.',
    'There can be no hope in this hell, no hope at all.',
    'Those who covet injury will find it in no short supply.',
    'Seize this momentum! Push on to the task\'s end!',
    'This expedition, at least, promises success.',
    'Success so clearly in view...\nor is it merely a trick of the light?',
    'Remind yourself that overconfidence is a slow and insidious killer.',

    // Common sayings (http://fortunecookieapi.herokuapp.com/v1/fortunes?limit=300)
    'A friend\'s frown is better than a fool\'s smile.',
    'A friend in need is a friend indeed.',
    'A friend is easier lost than found.',
    'A friend to everybody is a friend to nobody.',
    'A problem shared is a problem halved.',
    'A true friend is someone who reaches for your hand, but touches your heart.',
    'False friends are worse than open enemies.',
    'Grief divided is made lighter.',
    'Memory is the treasure of the mind.',
    'Old friends and old wine are best.',
    'To err is human; to forgive, divine.',
    'Love levels all inequalities.',
    'Love to live and live to love.',
    'True beauty lies within.',
    'You can\'t live on bread alone.',
    'A wink is as good as a nod, to a blind man.',
    'Anger and hate hinder good counsel.',
    'Appearances are deceptive.',
    'Attack is the best form of defense.',
    'Be slow in choosing, but slower in changing.',
    'Do unto others as you would have them do to you.',
    'Heavy givers are light complainers.',
    'I am rubber and you are glue. Your words bounce off me and stick to you.',
    'It\'s not over till it\'s over.',
    'No man or woman is worth your tears,\nand the one who is, won\'t make you cry.',
    'Open confession is good for the soul.',
    'Out of sight, out of mind.',
    'Patience is a virtue.',
    'Persuasion is better than force.',
    'Spare the rod and spoil the child.',
    'Temper is so good a thing that we should never lose it.',
    'To the world you may be one person,\nbut to one person, you may be the world.',
    'Wondrous is the strength of cheerfulness.',
    'You made your bed, now you must lie in it.',
    'A good thing is all the sweeter when won with pain.',
    'All things come to those that wait.',
    'As one door closes, another always opens.',
    'As you go through life, make this your goal,\nwatch the doughnut and not the hole.',
    'Brevity is the soul of wit.',
    'Do right and fear no man.',
    'Easy come, easy go.',
    'Experience is the hardest teacher.\nShe gives the test first and the lesson afterwards.',
    'Fortune favours the brave.',
    'He who laughs last, laughs longest.',
    'Home is where the heart is.',
    'Hope for the best and prepare for the worst.',
    'It never rains but it pours.',
    'Leave tomorrow till tomorrow.',
    'Procrastination is the thief of time.',
    'While there\'s life there\'s hope.',
    'An apple a day keeps the doctor away,\nan onion a day keeps everyone away.',
    'Better late thrive than never do well.',
    'Bread never falls but on its buttered side.',
    'Don\'t bite the hand that feeds you.',
    'Drink like a fish, water only.',
    'Early to bed, early to rise,\nmakes you healthy, wealthy & wise.',
    'Good wine ruins the purse,\nand bad wine ruins the stomach.',
    'It is no use crying over spilt milk.',
    'What can\'t be cured must be endured.',
    'If you don\'t say it you will not have to unsay it.',
    'Keep your mouth shut and your eyes open.',
    'Say what you mean and mean what you say.',
    'Speak clearly, if you speak at all.',
    'Stop beating around the bush.',
    'Accidents will happen.',
    'Don\'t knock on death\'s door,\nring the doorbell and run.',
    'Four eyes are better than two.',
    'He who fights and runs away,\nlives to fight another day.',
    'It is better to stay silent and be thought a fool,\nthan to open one\'s mouth and remove all doubt.',
    'Out of the frying pan into the fire.',
    'The darkest hour is before the dawn.',
    'Those who don\'t learn from history are doomed to repeat it.',
    'Where observation is concerned,\nchance favours only the prepared mind.',
    'Wisdom is better than strength.',
    'You never know what you can do till you try.',
    'Be the labour great or small,\ndo it well or not at all.',
    'All work and no play makes Jack a dull boy.',
    'If at first you don\'t succeed, try, try again.',
    'If you can\'t help, don\'t hinder.',
    'If you see something you like, take it and make it better.',
    'Never put off \'til tomorrow what you can do today.',
    'A bird makes his nest little by little.',
    'Curiosity killed the cat;\nSatisfaction brought it back.',
    'Curses, like chickens come home to roost.',
    'Don\'t count your chickens before they hatch.'
  ]
  const fortune = math.getRandomStringFromArray(fortunes)

  // Random intro.
  const intros = [
    'Here\'s your fortune',
    'Here you go',
    'Hope it\'s a good one'
  ]
  const intro = math.getRandomStringFromArray(intros)

  // Send fortune in an embed.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      author: {
        name: `${intro}, ${msg.author.username}!`,
        icon_url: 'https://i.imgur.com/CBHZY0m.png'
      },
      description: fortune
    }
  })
}

module.exports = {
  name: 'fortune',
  desc: 'Get a fortune! For best results, get a snack first, break it in half, then use this command.',
  aliases: ['fortunecookie'],
  usage: 'fortune',
  examples: ['fortune'],
  run
}