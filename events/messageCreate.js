module.exports = {
  name: "messageCreate",

  async execute(client, message) {

    console.log("MESSAGE EVENT FIRED");
    console.log(message.content);

    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);

    console.log(args);

    const cmdName = args.shift().toLowerCase();

    console.log("COMMAND:", cmdName);

    console.log(client.prefixCommands);

    const cmd = client.prefixCommands.get(cmdName);

    console.log("FOUND CMD:", cmd);

    if (!cmd) return;

    try {
      await cmd.execute(message, args);
    } catch (err) {
      console.error(err);
    }
  }
};