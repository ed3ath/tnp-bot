const { MessageEmbed } = require('discord.js')

const config = require('../../config')

module.exports = {
  group: 'Music',
  name: 'delmusic',
  aliases: ['del'],
  desc: 'Removes music from queue',

  async execute (client, message, args, queue) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
    if (args.length !== 1) {
      embed.setTitle(':x: Incorrect syntax.')
        .setDescription(`Use \`${config.prefix}delmusic <Queue #>\``)
      return message.channel.send(`<@${message.author.id}>`, { embed })
    }
    await queue.del(Number(args[0]) - 1)
    embed.setDescription(`:white_check_mark: \`#${Number(args[0])}\` was removed from music queue.`)

    message.channel.send({ embed })
  }
}
