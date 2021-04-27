const { MessageEmbed } = require('discord.js')

module.exports = {
  group: 'Music',
  name: 'listmusic',
  aliases: ['list'],
  desc: 'Displays current music queue',

  execute (client, message, args, queue) {
    const list = queue.get()
    const embed = new MessageEmbed()
      .setTitle('Current Music Queue')
      .setColor('RANDOM')

    if (list.length > 0) {
      list.forEach((info, i) => {
        embed.addField(`#${i + 1}`, info.title)
      })
    } else { embed.setDescription('Music queue is empty.') }

    message.channel.send({ embed })
  }
}
