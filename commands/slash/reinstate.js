const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reinstate")
    .setDescription("Reinstate a deputy.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Select the user to reinstate.")
        .setRequired(true)

    )

    .addRoleOption(option => option
        .setName("rank")
        .setDescription("Select the rank you are reinstating them to.")
        .setRequired(true)

    )

    .addStringOption(option => option
        .setName("notes")
        .setDescription("Input notes for the reinstatement or user.")
        .setRequired(true)

    ),

    async execute (interaction) {
        const hasRole = interaction.member.roles.cache.has("1324271492225044490");
        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!isAdmin && !hasRole) {
            return interaction.reply({content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})

        }
        const user = interaction.options.getUser("user");
        const rank = interaction.options.getRole("rank");
        const notes = interaction.options.getString("notes");

        const logChannel = interaction.guild.channels.cache.get("1502905907653251082");
        await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Reinstatement Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A reinstatement has been processed. View information regarding it below.\n\n**User:** ${user}\n**Rank:** ${rank}\n**Notes:** ${notes}\n-# This retirement was processed by ${interaction.user}.`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a00950c&is=69ff438c&hm=f649ac59044116ca7ab9fef41098da0ae4ecaad67feaece2d26235e9953916ec&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
})
    }
}