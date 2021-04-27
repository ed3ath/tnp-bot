const { MessageEmbed } = require('discord.js')

const config = require('../../config')

module.exports = {
  group: 'Music',
  name: 'addmusic',
  aliases: ['add'],
  desc: 'Adds music to queue',

  async execute (client, message, args, queue) {
    message.suppressEmbeds(true)
    const embed = new MessageEmbed()
      .setColor('RANDOM')
    if (args.length !== 1) {
      embed.setTitle(':x: Incorrect syntax.')
        .setDescription(`Use \`${config.prefix}addmusic <youtube link>\``)
      return message.channel.send(`<@${message.author.id}>`, { embed })
    }
    const songInfo = await queue.add(args[0])
    embed.setDescription(`:white_check_mark: \`${songInfo.videoDetails.title}\` was added to music queue.`)

    message.channel.send({ embed })
  }
}
