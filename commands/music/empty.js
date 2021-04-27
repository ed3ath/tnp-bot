const { MessageEmbed } = require('discord.js')

module.exports = {
  group: 'Music',
  name: 'emptymusic',
  aliases: ['empty'],
  desc: 'Clears music queue',

  async execute (client, message, args, queue) {
    const embed = new MessageEmbed()
    queue.empty()
    embed.setDescription(':white_check_mark: Music queue was emptied.')

    message.channel.send({ embed })
  }
}
