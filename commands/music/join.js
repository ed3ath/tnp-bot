const config = require('../../config')

module.exports = {
  group: 'Music',
  name: 'joinchannel',
  aliases: ['join'],
  desc: 'Makes the bot to join your current voice channel',

  async execute (client, message, args, queue) {
    const channel = message.member.voice.channel
    console.log(config.voice, channel.id)
    if (config.voice === channel.id) {
      await queue.join(channel)
    }
  }
}
