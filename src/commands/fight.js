const common = require('../utils/common')
const math = require('../utils/math')

let messages = []

/**
 * Attack names inspired by various sources, including Baldur's Gate, LoL, and random stuff.
 */
const attacks = [
  // Name, damage, accuracy, crit chance, heal.

  // Weak attacks (2x).
  ['Acrobatics', 45, 95, 70, 0],
  ['Bite', 40, 100, 80, 0],
  ['Butt-Stomp', 35, 95, 85, 0],
  ['First Try', 50, 70, 75, 0],
  ['Glitterdust', 45, 80, 75, 0],
  ['Fracture', 50, 75, 70, 0],
  ['Nether Blade', 40, 90, 80, 0],
  ['Tantrum', 35, 70, 90, 0],
  ['Friendliness Pellet', 35, 95, 85, 0],
  ['Splishy Splash', 50, 70, 75, 0],
  ['Flying Nachos', 45, 80, 75, 0],
  ['Judgamental Look', 50, 75, 70, 0],
  ['Tickle Attack', 40, 90, 80, 0],
  ['Harsh Language', 35, 70, 90, 0],

  // Normal attacks (1x).
  ['Falcon Punch', 50, 90, 50, 0],
  ['Piercing Arrow', 45, 85, 65, 0],
  ['Savagery', 60, 80, 50, 0],
  ['Frozen Orb', 55, 85, 60, 0],
  ['Backhand Chop', 45, 85, 65, 0],
  ['Soul Crush', 60, 80, 50, 0],
  ['Calamity Cannon', 55, 75, 50, 0],

  // Powerful attacks (1x).
  ['10M Volt Thunderbolt', 50, 80, 15, 0],
  ['Holy Hand Grenade', 80, 75, 20, 0],
  ['Hadouken', 55, 85, 20, 0],
  ['Slipper', 50, 95, 45, 0],
  ['Hundred Rending Fists', 55, 85, 25, 0],
  ['Super Combo', 55, 85, 20, 0],
  ['Fus-Ro-Dah', 40, 95, 45, 0],

  // Defensive moves (1x).
  ['Drink your Water', 0, 80, 75, 15],
  ['Pineapple Pizza', 0, 70, 80, 30],
  ['Eat Your Greens', 0, 75, 70, 25],
  ['Praise the Sun', 0, 70, 80, 30]
]

/**
 * Selects a random attack and rolls damage, crit and miss chance.
 */
const getAttack = () => {
  const attackData = math.getRandomStringFromArray(attacks, false)

  const attack = {
    name: attackData[0],
    dmg: parseInt((attackData[1] * math.getRandomFloat(1, 1.3)).toFixed(0), 10),
    heal: parseInt((attackData[4] * math.getRandomFloat(0.75, 1.25)).toFixed(0), 10),
    crit: false,
    miss: attackData[2] < math.getRandomFloat(-50, 100)
  }

  // Roll crit chance.
  attack.crit = attackData[3] < math.getRandomFloat(1, 100)

  if (attack.crit) attack.dmg = parseInt((attack.dmg * math.getRandomFloat(1.5, 2.5)).toFixed(0), 10)

  return attack
}

/**
 * Gets random attack, applies damage/heal and returns output.
 *
 * @param {Object} attacker Fighter performing the attack.
 * @param {Object} target Fighter being attacked.
 *
 * @returns {string} Summary of the attack in one sentece.
 */
const performAttack = (attacker, target) => {
  let output = ''
  const attk = getAttack()

  // Check if attack missed.
  if (attk.miss) return `_**${attacker.name}** uses **${attk.name}**, but misses!_`

  // Add crit notice to output.
  let critOutput = ''
  if (attk.crit) {
    critOutput = '**critical** '
  }

  if (attk.heal) {
    // Heal only.
    attacker.hp += attk.heal
    output += `**${attacker.name}** uses **${attk.name}**, healing for ${attk.heal} HP!\n(*${attacker.name}* now has ${attacker.hp} HP)`
  } else {
    // Damage only.
    target.hp -= attk.dmg
    output += `**${attacker.name}** uses **${attk.name}**, causing ${attk.dmg} ${critOutput}dmg!\n(_${target.name}_ now has ${target.hp} HP)`
  }

  return output
}

/**
 * Checks if a fighter's HP has gone below -50, if so adds an 'Overkill' message to output.
 *
 * @param {Object} fighter Fighter to check.
 */
const checkOverkill = (fighter) => {
  if (fighter.hp < -50) {
    messages.push('\n**Overkill!**')
  }
}

/**
 * Checks if one of the fighters runs out of HP, and prints ending message.
 *
 * @param {Object} instigator Fighter that started the fight.
 * @param {Object} subject Fighter that was attacked.
 *
 * @returns {Boolean} `True` if any of the fighters has run out of HP, `false` otherwise.
 */
const checkFighterDown = (instigator, subject) => {
  if (instigator.hp < 1) {
    checkOverkill(instigator)
    messages.push(`\n${instigator.name} was knocked out!\n\n🎖 **${subject.name.toUpperCase()} WINS!**`)
  } else if (subject.hp < 1) {
    checkOverkill(subject)
    messages.push(`\n${subject.name} was knocked out!\n\n🎖 **${instigator.name.toUpperCase()} WINS!**`)
  }

  if (instigator.hp <= 0 || subject.hp <= 0) {
    return true
  } else {
    return false
  }
}

/**
 * Sets up turns and starts the fight!
 *
 * @param {Object} instigator Fighter that started the fight.
 * @param {Object} subject Fighter that was attacked.
 */
const startFight = (instigator, subject) => {
  // Attack turns (0 = instigator, 1 = subject).
  let turn = math.getRandomInt(0, 1)

  // Perform attacks until a fighter runs out of HP.
  while (!checkFighterDown(instigator, subject)) {
    // Check who's attacking this turn.
    if (turn === 0) {
      messages.push(performAttack(instigator, subject))
    } else {
      messages.push(performAttack(subject, instigator))
    }

    // Update turn variable.
    if (turn === 0) {
      turn = 1
    } else {
      turn = 0
    }
  }

  return messages.join('\n')
}

const run = (client, msg, args) => {
  // Empty messages array.
  messages = []

  // Get fighters.
  const subject = {
    name: common.stripMentions(args.join(' '), msg),
    hp: 150
  }
  const instigator = {
    name: common.displayName(msg),
    hp: 150
  }

  // If no subject specified, default to "everyone" or similar string.
  if (!subject.name) {
    subject.name = common.randomSubject(true)
  }

  if (subject.name.toLowerCase() === instigator.name.toLowerCase()) {
    subject.name = 'himself/herself'
  }

  const title = `⚔ ${instigator.name} started a fight with ${subject.name}! ⚔`

  // Avoid using 'himself/herself' during fights.
  if (subject.name === 'himself/herself') {
    subject.name = instigator.name
  }

  // Reply with an embed message.
  msg.channel.send({
    embed: {
      title,
      color: 0x2f3136,
      description: startFight(instigator, subject)
    }
  }).catch(err => common.sendErrorMsg(msg, err))
}

module.exports = {
  name: 'fight',
  desc: 'Start a fight with someone.\n\nCharacters start with 150HP and take turns to attack. Attacks are selected randomly, and their damage multiplier is also rolled randomly each turn. Each attack has a different accuracy and critical hit chance. The first fighter that runs out of HP loses.',
  aliases: ['battle'],
  usage: 'fight [subject]',
  examples: ['fight', 'fight Loch Ness Monster', 'fight @Batman'],
  run
}
