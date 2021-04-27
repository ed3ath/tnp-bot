module.exports = {
  group: 'Music',
  name: 'leavechannel',
  aliases: ['leave'],
  desc: 'Makes the bot to leave your current voice channel',

  async execute (client, message, args, queue) {
    await queue.leave()
  }
}
