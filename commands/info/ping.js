const { MessageEmbed } = require('discord.js')

module.exports = {
  group: 'Info',
  name: 'ping',
  aliases: ['latency'],
  desc: 'Displays bot latency',

  execute (client, message, args) {
    message.channel.send('Pinging...')
      .then(sentMsg => {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`:ping_pong: Pong! Took \`${sentMsg.createdTimestamp - message.createdTimestamp}ms\``)
        sentMsg.edit(embed)
      })
  }
}
