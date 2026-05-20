module.exports = {
  name: "messageCreate",

  async execute(client, message) {



    if (message.author.bot) return;

    // ================= PREFIX COMMANDS =================
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/);

    const cmdName = args.shift().toLowerCase();

    console.log(
      `[PREFIX] ${message.author.tag} used ${client.prefix}${cmdName}`
    );

    const cmd = client.prefixCommands.get(cmdName);

    console.log(
      `[COMMAND FOUND]: ${cmd ? "YES" : "NO"}`
    );

    if (!cmd) return;

    try {
      await cmd.execute(message, args);

      console.log(
        `[COMMAND SUCCESS] ${cmdName}`
      );

    } catch (err) {

      console.error(
        `[COMMAND ERROR] ${cmdName}`
      );

      console.error(err);
    }
  }
};