const math = require('../utils/math')

const run = (client, msg, args) => {
  // Ramdom adjective.
  const quote_array = [
    // Intros.
    'Leave nothing unchecked, there is much to be found in forgotten places.',
    'Trinkets and charms, gathered from all the forgotten corners of the earth...',
    'In time, you will know the tragic extent of my failings...',
    'I was lord of this place, before the crows and rats made it their domain.',
    'There is a great horror beneath the manor: a Crawling Chaos that must be destroyed!',
    'Curiosity, interest, and obsession — mile markers on my road to damnation.',
    'Let me share with you the terrible wonders I have come to know...',

    // Buildings
    'More arrive, foolishly seeking fortune and glory in this domain of the damned.',
    'A little hope, however desperate, is never without worth.',
    'With enough ale, maybe they can be inured against the horrors below.',
    'A man in a robe, claiming communion with the divine. Madness.',
    'Fan the flames! Mold the metal! We are raising an army!',

    // Recruiting
    'The thrill of the hunt... The promise of payment...',
    'To those with the keen eye, gold gleams like a dagger\'s point.',
    'Barbaric rage and unrelenting savagery make for a powerful ally.',
    'To fight the abyss, one must know it...',

    // Dismising heros
    'This one has become vestigial, useless.',
    'Send this one to journey elsewhere, for we have need of sterner stock.',
    'The task ahead is terrible, and weakness cannot be tolerated.',

    // Entering Ruins
    'Pace out the halls of your lineage, once familiar, now foreign.',
    'Corruption has soaked the soil, sapping all good life from these groves - let us burn out this evil.',
    'Room by room, hall by hall, we reclaim what is ours.',
    'This day belongs to the Light!',

    // Failing expedition
    'Wounds to be tended; lessons to be learned.',
    'A setback, but not the end of things!',
    'You will endure this loss, and learn from it.',
    'We fall so that we may learn to pick ourselves up once again.',
    'Where there is no peril in the task, there can be no glory in its accomplishment.',
    'Great adversity has a beauty - it is the fire that tempers the blade.',

    // Light & Dark
    'The match is struck. A blazing star is born!',
    'The way is lit. The path is clear. We require only the strength to follow it.',
    'In radiance may we find victory.',
    'As the light gains purchase, spirits are lifted and purpose is made clear.',
    'The light, the promise of safety!',
    'Darkness closes in, haunting the hearts of men.',
    'Terrors may indeed stalk these shadows, but yonder – a glint of gold.',
    'Circled in the dark, the battle may yet be won.',
    'Gathered close in tenuous firelight, and uneasy companionship.',
    'A moment of respite. A chance to steel oneself against the coming horrors.',
    'Huddled together, furtive and vulnerable. Rats in a maze.',

    // Traps!
    'Cruel machinations spring to life with a singular purpose!',
    'Curious is the trap-maker\'s art... his efficacy unwitnessed by his own eyes.',
    'Mechanical hazards, possessed by evil intent.',
    'Ambushed by foul invention!',
    'Carelessness will find no clemency in this place!',

    // Obstacles
    'Even the cold stone seems bent on preventing passage.',

    // Healing
    'A momentary abatement...',
    'Surgical precision!',
    'Vigor is restored!',
    'The blood pumps, the limbs obey!',
    'The flesh is knit!',
    'Death cannot be escaped! But it can be postponed.',
    'Death is patient, it will wait.',

    // Killing enemy
    'As the fiend falls, a faint hope blossoms.',
    'Confidence surges as the enemy crumbles!',
    'Press this advantage, give them no quarter!',
    'Their formation is broken - maintain the offensive.',
    'Continue the onslaught! Destroy. Them. All.',
    'Executed with impunity!',
    'Begone, fiend!',
    'Back to the pit!',
    'Another one falls!',
    'Prodigious size alone does not dissuade the sharpened blade.',
    'The bigger the beast, the greater the glory.',
    'A death by inches...',
    'Great is the weapon that cuts on its own!',
    'Slowly, gently, this is how a life is taken...',
    'The slow death - unforeseen, unforgiving.',

    // Receiving damage
    'How quickly the tide turns!',
    'Grievous injury, palpable fear...',
    'Death waits for the slightest lapse in concentration.',
    'Festering fear consumes the mind!',
    'The abyss returns even the boldest gaze.',

    // Buffs
    'The blood quickens!',
    'A brilliant confluence of skill and purpose!',

    // Afflictions
    'The mind cannot hope to withstand such an assault.',
    'Madness, our old friend!',
    'The abyss is made manifest!',
    'Frustration and fury, more destructive than a hundred cannons.',
    'There can be no hope in this hell, no hope at all.',
    'Those who covet injury find it in no short supply.',

    // Hero death
    'Survival is a tenuous proposition in this sprawling tomb.',
    'Another life wasted in the pursuit of glory and gold.',
    'More dust, more ashes, more disappointment.',

    // Win battle
    'These nightmarish creatures can be felled! They can be beaten!',
    'Seize this momentum! Push on to the task\'s end!',
    'This expedition, at least, promises success.',
    'Success so clearly in view... or is it merely a trick of the light?',
    'Remind yourself that overconfidence is a slow and insidious killer.',
  ]
  const quote = math.getRandomStringFromArray(quote_array)

  // Send an embed message with the stream details.
  msg.channel.send({
    embed: {
      color: 0x82170f,
      description: `**${quote}**`,
    }
  })
}

module.exports = {
  name: 'ancestor',
  desc: 'Gain inspiration (or not) with one of the Darkest Dungeon Ancestor\'s quotes.',
  aliases: ['darkestdungeon', 'dd'],
  usage: ['ancestor'],
  examples: ['ancestor'],
  run
}
