module.exports = {
    name: "say",

    async execute (message, agrs) {
        const isAdmin = message.member.permissions.has("Administrator");
        if (!isAdmin) {
            return message.reply("<:fsco_xMark:1506499171509866516> You do not have permission to run this command.")

        }

        const text = agrs.slice(0).join(" ");

        await message.delete();
        await message.channel.send(text)
    }
}