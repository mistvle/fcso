const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dotw")
    .setDescription("Issue a DOTW award.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("Select the user to receive DOTW.")
        .setRequired(true)

    )

    .addStringOption(option => option
        .setName("shift_time")
        .setDescription("Input the amount of time of shift the user had in hours.")
        .setRequired(true)

    ),

    async execute (interaction) {
        const hasRole = interaction.member.roles.cache.has("1324271492225044490");
        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!hasRole && !isAdmin) {
            return interaction.reply({content: "<:fsco_xMark:1506499171509866516> You do not have permission to run this command.", flags: 64})

        }

        const user = interaction.options.getUser('user');
        const shift = interaction.options.getString('shift_time');
        await user.roles.add("1457943782786859123");

        const channel = interaction.guild.channels.cache.get("1464476938373566635");
        await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_confetti:1497266755402465331> Deputy of the Week"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `Congratulations to the following user on receiving **Deputy of the Week**. Deputy of the week is achieved by obtaining the most amount of shift time with the least amount of infractions.\n\n**Deputy:** ${user}\n**Shift Time:** ${shift}\n\nEnsure to congratulate the user on their achievement.`
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
  await interaction.reply({content: "<:fcso_check:1506063526182125608> **Successfully** issued Deputy of the Week."})
    }
}