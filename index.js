const { Client, Collection } = require('discord.js')
const path = require('path')
const glob = require('glob')
require('dotenv').config()

// Require the config.json file, and define our Client.
const config = require('./config')
const client = new Client()

const Queue = require('./lib/queue')
const Stats = require('./lib/stats')

// Create two Collections where we can store our commands and aliases in.
// Store these collections on the client object so we can access them inside commands etc.
client.commands = new Collection()
client.aliases = new Collection()

// Function that will load all commands from the given directory.
function loadCommands (cmdDir) {
  // Create an empty array that will store all the file paths for the commands,
  // and push all files to the array.
  const items = []
  items.push(...glob.sync(`${path.join(__dirname, cmdDir)}/**/*.js`))

  // Iterate through each element of the items array and add the commands / aliases
  // to their respective Collection.
  for (const item of items) {
    // Remove any cached commands
    if (require.cache[require.resolve(item)]) delete require.cache[require.resolve(item)]

    // Store the command and aliases (if it has any) in their Collection.
    const command = require(item)
    client.commands.set(command.name, command)
    if (command.aliases) {
      for (const alias of command.aliases) {
        client.aliases.set(alias, command.name)
      }
    }
  }
  console.log('Commands was loaded...')
}
// Run function and pass the relative path to the 'commands' folder.
loadCommands('commands')

let queue = null
let stats = null
// Client ready event
client.on('ready', async () => {
  console.log('Bot is ready...')
  queue = new Queue(client)
  stats = new Stats()
})
// Client message event, contains the logic for the command handler.
  .on('message', message => {
    // Stats

    /* if (config.stats.includes(message.channel.id)) {
      stats.add(message.author.id)
    } */

    // Make sure the message contains the command prefix from the config.js.
    if (!message.content.startsWith(config.prefix)) return
    // Make sure the message author isn't a bot.
    if (message.author.bot) return
    // Make sure the channel the command is called in is a text channel.
    if (message.channel.type !== 'text') return

    if (config.text !== message.channel.id) return

    /* Split the message content and store the command called, and the args.
    * The message will be split using space as arg separator.
    */
    const cmd = message.content.split(/\s+/g)[0].slice(config.prefix.length)
    const args = message.content.split(/\s+/g).slice(1)

    try {
      // Check if the command called exists in either the commands Collection
      // or the aliases Collection.

      let command
      if (client.commands.has(cmd)) {
        command = client.commands.get(cmd)
      } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd))
      }

      // Make sure command is defined.
      if (!command) return

      // If the command exists then run the execute function inside the command file.

      command.execute(client, message, args, queue)
      console.log(`Ran command: ${command.name}`) // Print the command that was executed.
    } catch (err) {
      console.error(err)
    }
  })
// Login
client.login(config.token)
