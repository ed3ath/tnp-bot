module.exports = {
  group: 'Music',
  name: 'skipmusic',
  aliases: ['skip'],
  desc: 'Plays next music in queue',

  async execute (client, message, args, queue) {
    const list = queue.get()

    if (list.length > 0) {
      await queue.skip()
    }
  }
}
