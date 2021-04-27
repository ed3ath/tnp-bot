module.exports = {
  group: 'Music',
  name: 'playmusic',
  aliases: ['play'],
  desc: 'Plays current music in queue',

  async execute (client, message, args, queue) {
    const list = queue.get()

    if (list.length > 0) {
      await queue.play()
    }
  }
}
