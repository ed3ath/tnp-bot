const { MessageEmbed } = require('discord.js')
const ytdl = require('ytdl-core')

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
    const songInfo = await ytdl.getInfo(args[0])
    queue.add({
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    })
    embed.setDescription(`:white_check_mark: \`${songInfo.videoDetails.title}\` was added to music queue.`)

    message.channel.send({ embed })
  }
}
