const { MessageEmbed } = require('discord.js')

const config = require('../../config')
const groupsOrder = {
  Info: 0,
  Music: 1
}

module.exports = {
  group: 'Info',
  name: 'help',
  aliases: ['cmd'],
  desc: 'Displays list of commands',

  execute (client, message, args) {
    const cmdStr = client.commands.reduce(function (r, a) {
      r[a.group] = r[a.group] || []
      r[a.group].push(a)
      return r
    }, {})
    const embed = new MessageEmbed()
      .setTitle('Commands')
      .setColor('RANDOM')
    Object.keys(cmdStr).sort((a, b) => {
      if (groupsOrder[a] > groupsOrder[b]) return 1
      if (groupsOrder[a] < groupsOrder[b]) return -1
      return 0
    }).forEach((group) => {
      embed.addField(group, cmdStr[group].map(cmd => `\`${config.prefix}${cmd.name}${(cmd.aliases.length > 0 ? `,${cmd.aliases.join(',')}` : '')} (${cmd.desc})\``).join('\n'), false)
    })
    message.channel.send({ embed })
  }
}
