const {
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    customId: "general_support_modal",

    async execute(interaction) {

        const CATEGORY_ID = "1303046712545382462";

        const inquiry = interaction.fields.getTextInputValue("inquiry");

        const channel = await interaction.guild.channels.create({
            name: `gen-${interaction.user.username}`,
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
                    id: "1461490715635876001",
                    allow: [PermissionFlagsBits.ViewChannel]
                },

                {
                    id: "1324271492225044490",
                    allow: [PermissionFlagsBits.ViewChannel]
                }
            ]
        });

        await channel.send({
            flags: 32768,
            components: [
                {
                    type: 17,
                    components: [
                        {
                            type: 12,
                            items: [
                                {
                                    media: {
                                        url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384484642968/Copy_of_Copy_of_GG_-_11.png"
                                    }
                                }
                            ]
                        },
                        {
                            type: 10,
                            content: `-# <@&1120063570105860167> | ${interaction.user}`
                        },
                        {
                            type: 14,
                            spacing: 2
                        },
                        {
                            type: 10,
                            content: `<:fcso_wave:1504698239071289456> Welcome to your ticket.\n\n**Ticket Details**\n- Inquiry: ${inquiry}`
                        },
                        {
                            type: 14,
                            divider: false
                        },
                        {
                            type: 1,
                            components: [
                                {
                                    style: 3,
                                    type: 2,
                                    label: "Claim",
                                    custom_id: "claim_ticket"
                                },
                                {
                                    style: 4,
                                    type: 2,
                                    label: "Close",
                                    custom_id: "close_ticket"
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        await interaction.reply({
            content: `<:check:1502740417370787881> Ticket created: ${channel}`,
            flags: 64
        });
    }
}