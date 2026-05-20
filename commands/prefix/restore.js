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
        const logChannel = message.guild.channels.cache.get("1506675770494423090");
        await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Restore Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `${message.author} has restored department roles to a user. View information regarding it below.\n\n<:fcso_people:1501770349694681109> **User:** ${member}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a0f158c&is=6a0dc40c&hm=114a26384989fd0dff410bf17372ae241e4599802243388a55d6b924b581d6a0&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
});

        message.reply(
            `<:fcso_check:1506063526182125608> **Successfully** restored department roles to ${member}.`
        );
    }
};