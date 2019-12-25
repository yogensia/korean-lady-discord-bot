const common = require('../utils/common')
const math = require('../utils/math')

const run = (client, msg, args) => {
  let subject = args.join(' ')

  // Make sure subject isn't empty.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who you want to give your precious treat!')
  } else {
    subject = subject.stripMentions(subject, msg)

    // Ramdom intro.
    const intro_array = [
      'WOAH!',
      'WOW!',
      'Look!',
      'Oh look!',
      'Look at that!',
      'Ooh!',
      'Oh cool!',
      'Oh nice!',
      'How nice!',
      'Wow!',
      'Yay!',
      'Holy cow!'
    ]
    const intro = math.getRandomStringFromArray(intro_array)

    // Ramdom adjective.
    const adjective_array = [
      'Aesthetic',
      'Aromatic',
      'Beautiful',
      'Caramelised',
      'Carefully Crafted',
      'Classy',
      'Crisp',
      'Delicious',
      'Dripping',
      'Famous',
      'Fantastic',
      'Fleshy',
      'Fluffy',
      'Fragile',
      'Fresh',
      'Fruity',
      'Funny Looking',
      'Generous',
      'Giant',
      'Gourmet',
      'Grandma\'s',
      'Heart Shaped',
      'Heavenly',
      'Homemade',
      'Intense',
      'Intricate',
      'Juicy',
      'Lively',
      'Lovely',
      'Luscious',
      'Mini',
      'Next Level',
      'Rainbow',
      'Squishy',
      'Sparkling',
      'Spicy',
      'Sprinkled',
      'Sticky',
      'Traditional',
      'Triple Layered',
      'Ultimate'
    ]
    const adjective = math.getRandomStringFromArray(adjective_array)

    // Ramdom flavour.
    const flavour_array = [
      'Almond & Honey',
      'Almond Liqueur',
      'Amaretto',
      'Bacon',
      'Baileys',
      'Butter-Stuffed',
      'Butterscotch Liqueur',
      'Cherry',
      'Chocolate',
      'Chocolate Bark',
      'Chocolate Chip',
      'Chocolate Hazelnut',
      'Cinamon-Honey',
      'Cocktail',
      'Cranberry',
      'Cream',
      'Dewberry',
      'Eggnog-dipped',
      'Elderberry',
      'Elderflower',
      'Gingerbread',
      'Ginseng',
      'Honey',
      'Japanese Milk',
      'Kahlúa',
      'Loganberry',
      'Macchiato',
      'Maltesers',
      'Martini',
      'Mint',
      'Nutella',
      'Oreo',
      'Peanut Butter',
      'Peppermint',
      'Pistachio',
      'Poppyseed',
      'Rice',
      'Raspberry',
      'Red Berry',
      'Red Wine',
      'Honey Rum',
      'Salted Caramel',
      'Salted Toffee',
      'Tiramisu',
      'Vanilla',
      'Walnut',
      'White and Golden Raspberry',
      'White Chocolate'
    ]
    const flavour = math.getRandomStringFromArray(flavour_array)

    // Ramdom treat.
    const treat_array = [
      [':apple:', 'Apple Crisp'],
      [':apple:', 'Apple Pockets'],
      [':bagel:', 'Bagels'],
      [':bread:', 'Banana Bread'],
      [':bread:', 'Bread'],
      [':bread:', 'Brioche Bread'],
      [':bread:', 'Melon Bread'],
      [':bread:', 'Tartine Bread'],
      [':cupcake:', 'Crème Brûlée'],
      [':chocolate_bar:', 'Brownies'],
      [':cake:', 'Angel Food Cakes'],
      [':cake:', 'Cakes'],
      [':candy:', 'Candy'],
      [':cake:', 'Cheese Cake'],
      [':cookie:', 'Cookies'],
      [':coconut:', 'Coconuts'],
      [':croissant:', 'Croissants'],
      [':cupcake:', 'Cupcakes'],
      [':doughnut:', 'Doughnuts'],
      [':pizza:', 'Fruit Pizza'],
      [':egg:', 'Poached Eggs'],
      [':fortune_cookie:', 'Fortune Cookies'],
      [':icecream:', 'Icecream'],
      [':lemon:', 'Lemon Meringue'],
      [':lollipop:', 'Lollipops'],
      [':cupcake:', 'Macaroons'],
      [':kiwi:', 'Kiwis'],
      [':melon:', 'Melon'],
      [':moon_cake:', 'Moon Cakes'],
      [':cupcake:', 'Mousse Cups'],
      [':cupcake:', 'Muffins'],
      [':pancakes:', 'Pancakes'],
      [':pineapple:', 'Pineapple Cobbler'],
      [':pineapple:', 'Pineapple Whip'],
      [':pie:', 'Pie'],
      [':pretzel:', 'Pretzels'],
      [':pear:', 'Poached Pears'],
      [':mango:', 'Poached Mangos'],
      [':pudding:', 'Pudding'],
      [':ice_cream:', 'Trifles'],
      [':rice_cracker:', 'Rice Crackers'],
      [':sweet_potato:', 'Sweet Potatoes'],
      [':strawberry:', 'Strawberry Fluff'],
      [':waffle:', 'Waffles'],
      [':watermelon:', 'Watermelon']
    ]
    const treat = math.getRandomStringFromArray(treat_array)

    msg.channel.send(`${intro} ${msg.author.username} is treating **${subject}** to...\n${treat[0]} **${adjective} ${flavour} ${treat[1]}!**`)

    // IHAA... If subject is Korean Lady she will react with a random emote.
    if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
      // Ramdom emote reaction.
      const reaction_array = [
        ['apollo20Wow', 'star_struck'],
        ['apollo20Blush', 'blush'],
        ['apolLove', 'heart'],
        ['apolHyper', 'yum'],
        ['POG', 'open_mouth'],
        ['POG', 'open_mouth'],
        ['ihaa', 'heart'],
      ]
      let reaction = math.getRandomStringFromArray(reaction_array)
      reaction = common.getCustomEmote(client, reaction[0], reaction[1])

      // If emote is available react to user's message.
      if (reaction.id) {
        msg.react(reaction.id)
      }
    }
  }
}

module.exports = {
  name: 'treat',
  desc: 'Give someone a treat.',
  aliases: ['dessert'],
  usage: ['treat <subject>'],
  examples: ['treat @KoreanLady'],
  run
}
