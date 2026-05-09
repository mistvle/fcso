const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("retire")
    .setDescription("Retire a department member.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Select the user to retire.")
        .setRequired(true)

    )

    .addRoleOption(option => option
        .setName("rank")
        .setDescription("Select the rank of the user.")
        .setRequired(true)

    )
    .addStringOption(option => option
        .setName("notes")
        .setDescription("Input notes for the user's retrirement.")
        .setRequired(true)
    ),

    async execute (interaction) {
        const hasRole = interaction.member.roles.cache.has("1324271492225044490");
        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!hasRole && !isAdmin) {
            return interaction.reply({content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})

        }

        const user = interaction.options.getUser("user");
        const rank = interaction.options.getRole("rank");
        const notes = interaction.options.getString("notes");

        const retirementChannel = interaction.guild.channels.cache.get("1464477011400462437");
        const logChannel = interaction.guild.channels.cache.get("1502817175403237416");

        await retirementChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502817772520869958/image.png?ex=6a01179d&is=69ffc61d&hm=f6b5da4eef93a017ab99e547a2ecbcefec96f72af47021e5ef5f8a6a01dd4967&=&format=webp&quality=lossless&width=550&height=193"
              }
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `<:fcso_gradcap:1502507106417250375> A new retirement has been procced by ${interaction.user}.\n\n**User:** ${user}\n**Rank:** ${rank}\n\n> We thank you for your service, and we wish you the best of luck on your future endeavours. `
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
});

    await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Retirement Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `**User:** ${user}\n**Rank:** ${rank}\n**Notes:** ${notes}\n-# This retirement was processed by ${interaction.user}.`
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
});

    await interaction.reply({content: "<:check:1502740417370787881> **Successfully** processed retirement.", flags: 64})

    }
}