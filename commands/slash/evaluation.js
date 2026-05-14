const { SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("evaluation")
    .setDescription("eval stuff")
    .addSubcommand(subcommand => subcommand
        .setName("issue")
        .setDescription("Issue an evaluation for a deputy.")
        .addUserOption(option => option
            .setName("deputy")
            .setDescription("Select the deputy to receive the evaluation.")
            .setRequired(true)

        )
        .addIntegerOption(option => option
            .setName("rating")
            .setDescription("Input the evaluation rating (1-5).")
            
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("feedback")
            .setDescription("Input feedback for the deputy.")
            .setRequired(true)

        )

        
    ),

    async execute (interaction) {
        const required_role_ids = [
            "1461490715635876001",
            "1324271492225044490"

        ]
        const hasRole = required_role_ids.some(id =>
  interaction.member.roles.cache.has(id)

);
    const isAdmin = interaction.member.permissions.has("Administrator");
    if (!isAdmin && !hasRole) {
        return interaction.reply({content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.", flags: 64})
    }
    const deputy = interaction.options.getUser("deputy");
    const rating = interaction.options.getInteger("rating");
    const feedback = interaction.options.getString("feedback");

    const channel = interaction.guild.channels.cache.get("1504356120376905840");
    await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Evaluation Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `An evaluation has been issued by ${interaction.user}. Review information regarding it below.\n\n<:fcso_people:1501770349694681109> **Deputy:** ${deputy}\n<:fcso_pin:1501770114830434324> **Rating:** ${rating}/5\n<:fcso_pen:1501769575614775466> **Feedback:** ${feedback}`
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

    await deputy.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Evaluation Issued"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 9,
          "components": [
            {
              "type": 10,
              "content": `An evaluation has been issued to you. Review information regarding it below.\n\n<:fcso_people:1501770349694681109> **Deputy:** ${deputy}\n<:fcso_pin:1501770114830434324> **Rating:** ${rating}/5\n<:fcso_pen:1501769575614775466> **Feedback:** ${feedback}`
            }
          ],
          "accessory": {
            "style": 2,
            "type": 2,
            "label": `${rating}/5`,
            "disabled": true,
            "flow": {
              "actions": []
            },
            "custom_id": "p_301954024763035649"
          }
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

    await interaction.reply({content: "<:check:1502740417370787881> **Successfully** issued evaluation.", flags: 64})
    }
}