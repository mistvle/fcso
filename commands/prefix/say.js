module.exports = {
    name: "say",

    async execute (message, agrs) {
        const isAdmin = message.member.permissions.has("Administrator");
        if (!isAdmin) {
            return message.reply("<:xMark:1502740326668828703> You do **not** have **permissions** to run this command.")

        }

        const text = agrs.slice(0).join(" ");

        await message.delete();
        await message.channel.send(text)
    }
}