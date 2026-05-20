module.exports = {
    name: "restore",

    async execute(message, args) {


        const isAdmin = message.member.permissions.has("Administrator");

        if (!isAdmin) {
            return message.reply("<:fsco_xMark:1506499171509866516> You do not have permission to run this command.");
        }

        const userId = args[0];

        if (!userId) {
            return message.reply("<:fsco_xMark:1506499171509866516> Please provide a user ID.");
        }

        const member = await message.guild.members.fetch(userId).catch(() => null);

        if (!member) {
            return message.reply("<:fsco_xMark:1506499171509866516> User not found.");
        }

        if (!message.client.removedRoles?.has(member.id)) {
            return message.reply("<:fsco_xMark:1506499171509866516> No saved roles found for this user.");
        }

        const roles = message.client.removedRoles.get(member.id);

        await member.roles.add(roles);

        message.client.removedRoles.delete(member.id);

        message.reply(
            `<:fcso_check:1506063526182125608> **Successfully** restored department roles to ${member}.`
        );
    }
};