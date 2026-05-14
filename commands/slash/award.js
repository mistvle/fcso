const { SlashCommandBuilder} = require ("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("award")
    .setDescription("award stuff")
    .addSubcommand(subcommand => subcommand
        .setName("issue")
        .setDescription("Issue an award.")
        .addUserOption(option => option
            .setName("deputy")
            .setDescription("Select the user to issue the award to.")
            .setRequired(true)

        )
        .addRoleOption(option => option
            .setName("award")
            .setDescription("Select the award to issue.")
            .setRequired(true)

        )

    ),

    async execute (interaction) {

        const hasRole = interaction.member.roles.cache.has("1324271492225044490");
        const isAdmin = interaction.member.permissions.has("Administrator");
        if (!hasRole && !isAdmin) {
            return interaction.reply({content:"<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})

        }

        const deputy = interaction.options.getUser("deputy");
        const award = interaction.options.getRole("award");

        const channel = interaction.guild.channels.cache.get("1464476938373566635");
        await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_confetti:1497266755402465331> Award Issued"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `Congratulations to the following user on achieving an award!\n\n<:fcso_people:1501770349694681109> **User:** ${deputy}\n<:fcso_pin:1501770114830434324> **Award:** ${award}\n-# Award issued by ${interaction.user}.`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a0683cc&is=6a05324c&hm=15a3cdc666284d8c98cca29752c3f1b5b3e75a48196ee873aed026b4ee93ee27&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
});

    const logChannel = interaction.guild.channels.cache.get("1504352930214707261");
    await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Award Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `An award has been issued by ${interaction.user}.\n\n<:fcso_people:1501770349694681109> **Deputy:** ${deputy}\n<:fcso_pin:1501770114830434324> **Award:** ${award}`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a0683cc&is=6a05324c&hm=15a3cdc666284d8c98cca29752c3f1b5b3e75a48196ee873aed026b4ee93ee27&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
});

    await interaction.reply({content: "<:check:1502740417370787881> **Succesfully** issued award.", flags: 64})
    }
}