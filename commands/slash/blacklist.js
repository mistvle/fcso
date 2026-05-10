const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("blacklist stuff")
    .addSubcommand(subcommand => subcommand
        .setName("issue")
        .setDescription("Issue a blacklist.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Select the user to issue the blacklist to.")
            .setRequired(true)

        )

        .addStringOption(option => option
            .setName("duration")
            .setDescription("Input the duration of the blacklist, e.g. Permanent, 30d.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("notes")
            .setDescription("Input any notes for the blacklist.")

        )

    ),

    async execute (interaction) {
        const isAdmin = interaction.member.permissions.has("Administrator");
        if (!isAdmin) {
            return interaction.reply({content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})

        }

        const user = interaction.options.getUser("user");
        const duration = interaction.options.getString("duration");
        const notes = interaction.options.getString("notes");

        const channel = interaction.guild.channels.cache.get("1502913750221590589");
        await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Blacklist Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A new blacklist has been logged. Review information regarding it below.\n\n**User:** ${user}\n**Duration:** ${duration}\n**Notes:** ${notes}\n-# This blacklist was logged by ${interaction.user}.`
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