module.exports = (Discord, client, message) => {
  const prefix = process.env.PREFIX

  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const cmd = args.shift().toLowerCase()

  const commands =
    client.commands.get(cmd) ||
    client.commands.find(c => c.aliases && c.aliases.includes(cmd))

  try {
    commands.execute(client, message, args, cmd, Discord)
  } catch (err) {
    message.channel.send('There was an error to execute this command!')
    console.log(err)
  }
}
