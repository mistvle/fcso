const { SlashCommandBuilder} = require("discord.js");

// store current messages
let currentVoteMessage = null;
let currentStartMessage = null;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shift")
    .setDescription("mass shift stuff")
    .addSubcommand(subcommand => subcommand
        .setName("start")
        .setDescription("Start a mass shift.")
        .addUserOption(option => option
            .setName("asst_commander")
            .setDescription("Select the assistant watch commander.")
            .setRequired(true)

        )
        .addUserOption(option => option
            .setName("supervisor_one")
            .setDescription("Select the first supervisor of the mass shift.")
            .setRequired(false)

        )
        .addUserOption(option => option
            .setName("supervisor_two")
            .setDescription("Select the second supervisor of the mass shift.")
            .setRequired(false)

        )

    )
    .addSubcommand(subcommand => subcommand
        .setName("vote")
        .setDescription("Host a vote for a mass shift.")
    )
    .addSubcommand(subcommand => subcommand
        .setName("end")
        .setDescription("End a mass shift.")
        
    ),

    async execute (interaction) {
        const sub = interaction.options.getSubcommand();

        const hasRole = interaction.member.roles.cache.has("1324271492225044490")
        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!hasRole && !isAdmin) {
            return interaction.reply({
                content: "<:xMark:1502740326668828703> You do **not** have **permission** to run this command.",
                flags: 64
            })
        }

        const channel = interaction.guild.channels.cache.get("1467260852486013186");

        if (sub === "start") {

            // delete vote message
            if (currentVoteMessage) {
                await currentVoteMessage.delete().catch(() => null);
                currentVoteMessage = null;
            }

            const assistant = interaction.options.getUser("asst_commander");
            const supervisor_one = interaction.options.getUser("supervisor_one") || "N/A";
            const supervisor_two = interaction.options.getUser("supervisor_two") || "N/A";

            const msg = await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:fcso_web:1501769662336209037> Mass Shift Start\n-# <@&1120063570105860167>`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A mass shift has been started by our **Command Team**. Mass shifts are a collective shift in which many whitelisted deputies get on to help fight crime within Florence County. Mass shifts are a great time to show your tactics & skills as a deputy to our Command Team, so ensure to join. If you voted for the shift to start, you are **required** to join. Failure to do so will result in an infraction. Review the shift commanders below.\n\n**Watch Commander:** ${interaction.user}\n**Assistant Watch Commander:** ${assistant}\n**Supervisor:** ${supervisor_one}\n**Supervisor:** ${supervisor_two}`
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

            // store start message
            currentStartMessage = msg;

            await interaction.reply({
                content: "<:check:1502740417370787881> **Succesfully** started mass shift.",
                flags: 64
            })
        }

        if (sub === "vote") {

            const msg = await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_calendar:1501769756028436621> Mass Shift Vote\n-# @here"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `A mass shift vote is being hosted by ${interaction.user}. React below if you are able to attend. Mass shifts are a collective shift held by our **Command Team** in which many deputies get in-game. A mass shift is an ideal time to show your skills & tactics to our Command Team.`
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

            // store vote message
            currentVoteMessage = msg;

            await msg.react("<:check:1502740417370787881>");

            await interaction.reply({
                content: "<:check:1502740417370787881> **Succesfully** started mass shift vote.",
                flags: 64
            })
        }

        if (sub === "end") {

            // delete start message
            if (currentStartMessage) {
                await currentStartMessage.delete().catch(() => null);
                currentStartMessage = null;
            }

            // delete vote message
            if (currentVoteMessage) {
                await currentVoteMessage.delete().catch(() => null);
                currentVoteMessage = null;
            }

            await channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_clock:1501769703096582255> Mass Shift End"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "The recent mass shift has now come to an end. We thank everyone who attended & showed dedication towards the **Florence County Sheriff's Office**. Another one will be hosted soon, so ensure to keep an eye on this channel for future mass shifts."
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

            await interaction.reply({
                content: "<:check:1502740417370787881> **Succesfully** ended the current mass shift.",
                flags: 64
            })
        }
    }
}