const {
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    customId: "ia_modal",

    async execute(interaction) {

        const CATEGORY_ID = "1303046712545382462";

        const callsign = interaction.fields.getTextInputValue("callsign");
        const username = interaction.fields.getTextInputValue("username");
        const reason = interaction.fields.getTextInputValue("reason");

        const channel = await interaction.guild.channels.create({
            name: `ia-${interaction.user.username}`,
            type: 0,
            parent: CATEGORY_ID,
            topic: interaction.user.id,

            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },

                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                },

                {
                    id: "1324271492225044490",
                    allow: [PermissionFlagsBits.ViewChannel]
                },

                {
                    id: "1109523623615680555",
                    allow: [PermissionFlagsBits.ViewChannel]
                }
            ]
        });

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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384484642968/Copy_of_Copy_of_GG_-_11.png?ex=6a12614d&is=6a110fcd&hm=f1ac86bd30276910f97b9cb1d32d1201268b711c4b8b086f58b62acc7354c0f2&=&format=webp&quality=lossless&width=1768&height=624"
              }
            }
          ]
        },
        {
          "type": 10,
          "content": `<@&1120063570105860167> | ${interaction.user}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `<:fcso_wave:1504698239071289456> Welcome to your ticket. Our team will assist you as soon as possible. Ensure to review our ticket guidelines below to avoid having your ticket closed.\n\n**Ticket Guidelines**\n- Do not ping any members of our team; they have already been notified\n- Remain respectful\n- Remain active within your ticket\n\n**Ticket Details**\n- **Deputy Callsign:** ${callsign}\n- **Deputy:** ${username}\n- **Reason:** ${reason}`
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "style": 3,
              "type": 2,
              "custom_id": "claim_ticket",
              "flow": {
                "actions": []
              },
              "label": "Claim"
            },
            {
              "style": 4,
              "type": 2,
              "custom_id": "close_ticket",
              "flow": {
                "actions": []
              },
              "label": "Close"
            }
          ]
        }
      ]
    }
  ]
});

        await interaction.reply({
            content: `<:fcso_check:1506063526182125608> Your ticket has been created: ${channel}`,
            flags: 64
        });
    }
}