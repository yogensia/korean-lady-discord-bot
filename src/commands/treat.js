const common = require('../utils/common')
const math = require('../utils/math')

/**
 * COMMAND: !treat <subject>
 *
 * Description: Give someone a treat.
 */
exports.run = (client, msg, args) => {
  let subject = args.join(' ')
  // Remove user mentions, experimental.
  if (subject.startsWith('<@')) {
    // Get username of first mention (ignore the rest if more than one).
    for (var [key, value] of msg.mentions.users) {
      subject = value.username
      break
    }
  }

  // Make sure subject isn't empty.
  if ('' === subject) {
    common.sendMissingParameterMsg(client, msg, 'You must specify who you want to give your precious treat!', 'treat @KoreanLady')
  } else {
    // Ramdom intro.
    const intro_array = [
      'WOAH!',
      'Look!',
      'Ooh!',
      'Oh cool!',
      'Oh nice!',
      'How nice!',
      'Wow!',
      'Yay!',
      'Holy cow!'
    ]
    const intro = math.getRandomInt(0, intro_array.length - 1)

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
      'Instense',
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
    const adjective = math.getRandomInt(0, adjective_array.length - 1)

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
    const flavour = math.getRandomInt(0, flavour_array.length - 1)

    // Ramdom treat.
    const treat_array = [
      [':apple:', 'Apple Crisp'],
      [':apple:', 'Apple Pockets'],
      [':bagel:', 'Bagels'],
      [':bread:', 'Banana Bread'],
      [':bread:', 'Bread'],
      [':bread:', 'Brioche Bread'],
      [':bread:', 'Melon Bread'],
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
    const treat = math.getRandomInt(0, treat_array.length - 1)

    msg.channel.send(`${intro_array[intro]} ${msg.author.username} is treating **${subject}** to...\n${treat_array[treat][0]} **${adjective_array[adjective]} ${flavour_array[flavour]} ${treat_array[treat][1]}!**`)

    // IHAA... If subject is Korean Lady she will react to the message as well.
    if ('koreanlady' === subject.toLowerCase() || 'korean lady' === subject.toLowerCase()) {
      // Try to get custom emotes.
      const emote_apollo20Wow = common.showEmote('apollo20Wow', client)
      const emote_ihaa = common.showEmote('ihaa', client)

      // If emote is available use it, otherwise send a normal message.
      if (null !== emote_apollo20Wow) {
        msg.react(emote_apollo20Wow)
      }
      if (null !== emote_ihaa) {
        msg.react(emote_ihaa)
      }
    }
  }
}
