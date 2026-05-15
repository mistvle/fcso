module.exports = {
  name: "rename",

  async execute(message, args) {
    if (message.author.bot) return;

    const STAFF_ROLE_IDS = "1120063570105860167";

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has(STAFF_ROLE_IDS);

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1502740326668828703> You do **not ** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic) {
      return message.reply({
        content: "<:xMark:1502740326668828703> This channel is not a ticket channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!/^\d+$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:xMark:1502740326668828703> You can only rename ticket channels.",
        allowedMentions: { repliedUser: false }
      });
    }

    const newName = args.slice(0).join(" ");

    if (!newName) {
      return message.reply({
        content: "<:xMark:1502740326668828703> Failed to detect a valid new ticket name.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      await message.channel.setName(newName);

      await message.reply(`<:check:1502740417370787881> **Successfully** renamed ticket to **${newName}**.`);
    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:xMark:1502740326668828703> An eror occured.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};