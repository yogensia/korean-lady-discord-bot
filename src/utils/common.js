/**
 * Replace user mentions with plain text usernames.
 *
 * @param {string} subject - User string to strip.
 * @param {Message} msg - Message object.
 * @return {string} A plain text username.
 */
String.prototype.stripMention = (subject, msg) => {
  if (subject.startsWith('<@')) {
    // Get username of first mention, ignoring the rest if more than one.
    for (var [key, value] of msg.mentions.users) {
      if (msg.author.username === value.username) {
        subject = 'himself/herself'
      } else {
        subject = value.username
      }
      return subject
    }
  } else {
    return subject
  }
}
