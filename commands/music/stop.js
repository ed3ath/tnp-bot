module.exports = {
  group: 'Music',
  name: 'stopmusic',
  aliases: ['stop'],
  desc: 'Stops playing current music in queue',

  async execute (client, message, args, queue) {
    await queue.stop()
  }
}
