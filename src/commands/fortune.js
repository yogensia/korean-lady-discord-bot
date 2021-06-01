const CronJob = require('cron').CronJob
const common = require('../utils/common')
const random = require('../utils/random')

// Fortunes.
const fortunes = [
  // Random and fun (https://www.boredpanda.com/funny-fortune-cookie-messages/, adapted).
  'Run.',
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
  'Your lucky numbers:\nActually... stay away from gambling this week.',
  'Your pet has not forgotten and will not forgive,\nuntil an offering or a sacrifice is given.',
  'Your pet is planning to eat you.',
  'You will gain no wisdom from this virtual cookie.',
  'You are doing a good job.\nYou will be rewarded sooner than you think.',
  'Virtual cookies have zero calories.',
  'The key to making the world a better place,\nyou will find in your pocket.',
  'Virtual fortiune cookies can\'t have printing errors,\nbut they still can have typos.',
  'The smart thing would be to prepare\nfor the unexpected.',
  'You will soon discover a hidden talent of yours.',
  'You broke a cookie that you can\'t eat for this fortune.\nWas it worth it? The answer is no.',
  'Your next fortune will become true. And by true I mean false.\nIt\'s all lies. But they are entertaining lies.\nAnd in the end isn\'t that the real truth?\nThe answer is: No.',
  'Disregard other fortune cookies, only pay attention to this fortune cookie:\nYou are awesome.',
  'Something wonderful is about to happy.\nSent from my iPhone.',
  'Plan to be spontaneous tomorrow.',
  'Your choices do not matter.',
  'Adopt an attitude of gratitude.',
  'You don\'t wanna know...',
  'Don\'t worry about it...',
  'Men with guns are coming to get you right now...',
  'A perfectly splendid day awaits you.',
  'Unlucky.',
  'Go beb.',
  'A true act of good will always spark another.',
  'You spark joy.',
  'Vision without action is a daydream.\nAction without vision is a nightmare.\n-Japanese proverb',

  // Random and fun (google image search, no attribution).
  'To truly find yourself,\nyou should play hide an seek alone.',
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
  'Don\'t ask a cookie what you can answer by yourself.',
  'You think it\'s a secret, but they know.\nThey. Know.',
  'Shame on you for thinking this bot is psychic.',
  'Rizaelnig yuo cna raed tihs mepsislled fnurote\nwlil be eht hgihgliht of yuor day.',
  'Pigeon poop burns the retina for 13 hours.\nYou will learn this the hard way.',
  'Psst! They are being paid to love you.',
  'Someone ahead of you in line will pay with a check.',
  'You\'re in **BIG** trouble!',
  'The stock market will be\nyour ticket to success.',
  'Don\'t worry about the stock market.\nInvest in family.',
  'You laugh now, but wait till you\nfind out what your pet did.',
  'You should go back to bed.',
  'Do it! Do it now! Today will be yesterday tomorrow.',
  'Do or do not. There is no try.',
  'There is someone seeing,\nand there is someone being seen.',
  'Today will be a huge improvement over yesterday.',
  'You will read this and say "Geez!,\nI could come up with better\nfortunes than that!"',
  'Accept the very next proposition you hear.',
  'I see money in your future.\nIt is not yours though.',
  'You are a chicken nuggie in the vegetarian salad of life.',
  'Procastination has prevented you from making bad decisions.',
  'You won\'t have to be faster than the bear.\nYou just have to be faster than the\nslowest person running from it...',
  'Beware of vampires...',
  'When you squeze an orange, orange juice\ncomes out - because that\'s what\'s inside.',
  'Kill them all...\nbefore it\'s too late.',
  'Little and often adds up to a lot.',
  'Avoid compulsively making things worse.',
  'The end is near...\nAnd it\'s all your fault!',
  'Someone is trying to poison you.',
  'Today will be a good day for pizza.',
  'Better safe than sorry.\nLearn to wield many types of weapons.',

  // http://hkessner.com/
  'You learn from your mistakes...\nYou will learn a lot today.',
  'You cannot love life until\nyou live the life you love.',
  'Be on the lookout for coming events;\nThey cast their shadows beforehand.',
  'The greatest love is self-love.',
  'Our deeds determine us,\nas much as we determine our deeds.',
  'Now is the time to try something new.',
  'The greatest risk is not taking one.',
  'You are talented in more ways than you know.',
  'When fear hurts you, conquer it and defeat it!',
  'You will be called in to fulfill\na position of high honor and responsibility.',
  'Love can last a lifetime, if you want it to.',
  'Wealth awaits you very soon.',
  'It\'s better to be alone sometimes.',
  'Your ability for accomplishment will follow with success.',
  'A stranger, is a friend you have not spoken to yet.',
  'Your shoes will make you happy today.',
  'Keep your eye out for someone special.',
  'There is no greater pleasure than\nseeing your loved ones prosper.',
  'If you have something good in your life, don\'t let it go!',
  'The love of your life is visiting your planet soon.',
  'Everyone agrees. You are the best.',
  'Serious trouble will bypass you.',
  'You will travel to many exotic places in your lifetime.',
  'Jealousy doesn\'t open doors, it closes them!',
  'Let the deeds speak.',
  'You can make your own happiness.',
  'What ever your goal is in life,\nembrace it, visualize it,\nand for it will be yours.',
  'You must try, or hate yourself for not trying.',
  'You already know the answer to the questions lingering inside your head.',
  'Never give up.',
  'A dream you have will come true.',
  'You will become great if you believe in yourself.',

  // https://joshmadison.com/2008/04/20/fortune-cookie-fortunes/
  'A dubious friend may be an enemy in camouflage.',
  'A fresh start will put you on your way.',
  'A golden egg of opportunity falls into your lap this month.',
  'All the effort you are making will ultimately pay off.',
  'Allow compassion to guide your decisions.',
  'Be careful or you could fall for some tricks today.',
  'Believe in yourself and others will too.',
  'Do not let ambitions overshadow small success.',
  'Go take a rest; you deserve it.',
  'The night life is for you.',
  'With age comes wisdom.',
  'You are almost there.',
  'You can see a lot just by looking.',
  'You love chinese food.',

  // Animal Crossing Fortunes.
  'You will soon be visited\nby a mustachioed man.',
  'A red hat may improve your head, as well as your fashion sense.',
  'Today is not your day.\nTomorrow doesn\'t look any better.',
  'He who stubs his toe is he who\nremembers his feet are there.',
  'Look to the sky when the sun sets.\nAll will be revealed in this twilight.',
  'In both life and love,\nthere is always another castle.',
  'He who play with fire would be\nwise to be flame retardant.',
  'Some people shy away from bombs,\nbut you are not some people.',
  'There are no shortcuts in life,\nexcept when there are.',
  'Never count your Yoshis before\nthey hatch. Plans often change.',
  'Sundaes are delicious every day of\nthe week, unless you hate ice cream.',
  'She who wears lava-proof pants is\ndressed for any occasion.',
  'I see much red in your future.\nMuch red indeed.',
  'A good attitude will always\ntake you further than a bad habit.',
  'Ask for a hammer, and you\'ll get a needle.',
  'A stitch in time saves nine… more stitches.',
  'Nothing ventured, nothing gained.',
  'You\'ll catch more flies with honey than vinegar.',
  'The walls have ears.',
  'Only quitters give up.',
  'You gotta put the pedal to the metal!',
  'Life is a buffet. Always go back for seconds.',
  'Slow and steady wins the race.',
  'Treat others as you would like to be treated.',
  'Pampering yourself is as important as food, water, and shelter!',
  'Home is where the heart is.',
  'Let gossip go in one ear and out the other.',
  'Always go for the burn!',
  'One rotten apple spoils the barrel.',
  'Be the kind of person your future self won\'t regret having been.',
  'Early to beb, early to rise.',
  'Don\'t just follow the flock.',
  'Get while the getting\'s good.',
  'Don\'t blink or you\'ll miss it.',
  'Please DO feed the bears!',
  'Fashion first!',
  'You snooze, you lose.',
  'Practice makes perfect.',
  'Life\'s short. Go eat cake.',
  'One nap leads to another.',
  'Keep your eyes on the prize.',
  'Pride\'ll put you in a pickle.',
  'It\'s always teatime somewhere.',
  'It\'s the thought that counts.',
  'As soon as you can grow a mustache, do it.',
  'Good things come in small packages.',
  'Sleep early. Wake late.',
  'Don\'t lose sight of what you\'re really after.',
  'Hard work beats talent.',
  'Sometimes you gotta learn to chill.',
  'Do what you want, but do it loud!',
  'The hero is brave in deeds as well as words.',
  'Everything in moderation. Except for snacks.',
  'Be true to your most shiny self.',
  'Act now before you change your mind!',
  'You can\'t learn a life lesson from a fortune cookie.',
  'Fall down seven times, get up eight.',
  'Time is money, but smiles are free.',
  'The higher you climb, the smaller things look.',
  'Keep it real. Real chill.',

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
  'Just be yourself,\nyou are wonderful.',
  'You are kind and trustworthy.\nOthers will count on you.',

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

// Shuffle fortunes.
random.shuffleArray(fortunes)

/**
 * SHUFFLE FORTUNES CRON JOB, runs monday.
 *
 * Re-shuffles the order of fortunes in the !fortune command every monday.
 */
const fortuneCronJob = new CronJob('0 0 * * MON', () => {
  console.log('Running Weekly Fortune reshuffle...')
  random.shuffleArray(fortunes)
})

fortuneCronJob.start()

const run = (client, msg, args) => {
  // Get next fortune in the array.
  const fortune = fortunes.shift()
  fortunes.push(fortune)

  // Send fortune in an embed.
  msg.channel.send({
    embed: {
      color: 0x2f3136,
      description: `${fortune}`
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
