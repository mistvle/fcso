const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("training")
    .setDescription("training management")

    .addSubcommand(subcommand => subcommand
        .setName("start")
        .setDescription("Start a training.")

    )

    .addSubcommand(subcommand => subcommand
        .setName("end")
        .setDescription("End a training.")

    )

    .addSubcommand(subcommand => subcommand
        .setName("vote")
        .setDescription("Start a training vote.")
        .addNumberOption(option => option
            .setName("time")
            .setDescription("Input in how many minutes the training will start.")
            .setRequired(true)

        )


    ),

    async exeucte (interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "start") {
            const hasRole = interaction.member.roles.cache.has("1461145178021564477")
            const isAdmin = interaction.member.permissions.has("Administrator");

            if (!hasRole && !isAdmin) {
                return interaction.reply({content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})
            }

            const channel = interaction.guild.channels.cache.get("1464767095853023273");

            await channel.send({
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502821804924731515/image.png?ex=6a011b5f&is=69ffc9df&hm=db72d5dad9ac6e8bcf6dcc8264545bfa29325b16662b360fe45332947dcaf9e5&=&format=webp&quality=lossless&width=550&height=193"
              }
            }
          ]
        },
        {
          "type": 10,
          "content": "-# <@&1109529646384554116>"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `<:fcso_gradcap:1502507106417250375> A training is now starting. Ensure to join if you are available to gain eligibility to move on to the next phase of your onboarding tot he department.\n\n### Training Information\n**Trainer:** ${interaction.user}\n**Training Server Code:** SCSRT`
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
}