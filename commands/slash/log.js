const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("log stuff")

    .addSubcommand(subcommand => subcommand
        .setName("training")
        .setDescription("Log a training.")

        .addUserOption(option => option
            .setName("cadet")
            .setDescription("Select the cadet who was trained.")
            .setRequired(true)
        )

        .addStringOption(option => option
            .setName("result")
            .setDescription("Select the result of the training.")
            .addChoices(
                {name: "Passed", value: "Passed"},
                {name: "Failed", value: "Failed"}
            )
            .setRequired(true)
        )

        .addStringOption(option => option
            .setName("feedback")
            .setDescription("Input feedback for the training.")
            .setRequired(true)
        )
    )

    .addSubcommand(subcommand => subcommand
        .setName("ridealong")
        .setDescription("Log a ridealong.")

        .addUserOption(option => option
            .setName("cadet")
            .setDescription("Select the cadet who completed their ride along.")
            .setRequired(true)
        )

        .addStringOption(option => option
            .setName("result")
            .setDescription("Select the result of the ride along.")
            .addChoices(
                {name: "Passed", value: "Passed"},
                {name: "Failed", value: "Failed"}
            )
            .setRequired(true)
        )

        .addStringOption(option => option
            .setName("feedback")
            .setDescription("Input feedback for the ride along.")
            .setRequired(true)
        )
    ),

    async execute(interaction) {

        const hasRole = interaction.member.roles.cache.has("1461145178021564477");
        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!hasRole && !isAdmin) {
            return interaction.reply({
                content: "<:fsco_xMark:1506499171509866516> You do not have permission to run this command.",
                flags: 64
            });
        }

        const sub = interaction.options.getSubcommand();

        // =========================
        // TRAINING
        // =========================
        if (sub === "training") {

            const cadet = await interaction.guild.members.fetch(
                interaction.options.getUser("cadet").id
            );

            const result = interaction.options.getString("result");
            const feedback = interaction.options.getString("feedback") || "No feedback provided.";

            const channel = interaction.guild.channels.cache.get("1464768657275097174");

            await channel.send({
                "flags": 32768,
                "components": [
                    {
                        "type": 17,
                        "components": [
                            {
                                "type": 10,
                                "content": "# <:fcso_briefcase:1501769870889586759> Training Log"
                            },
                            {
                                "type": 14,
                                "spacing": 2
                            },
                            {
                                "type": 10,
                                "content": `A training has been logged by ${interaction.user}. View information regarding it below.\n\n<:fcso_people:1501770349694681109> **Cadet:** ${cadet}\n<:fcso_pin:1501770114830434324> **Result:** ${result}\n<:fcso_book:1501785318666276865> **Feedback:** ${feedback}`
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
                                            "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&=&format=webp&quality=lossless&width=2408&height=206"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            await cadet.send({
                "flags": 32768,
                "components": [
                    {
                        "type": 17,
                        "components": [
                            {
                                "type": 10,
                                "content": "# <:fcso_briefcase:1501769870889586759> Training Completed"
                            },
                            {
                                "type": 14,
                                "spacing": 2
                            },
                            {
                                "type": 10,
                                "content": `Your training has been completed. View information regarding it below.\n\n<:fcso_pin:1501770114830434324> **Result:** ${result}\n<:fcso_book:1501785318666276865> **Feedback:** ${feedback}`
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
                                            "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&=&format=webp&quality=lossless&width=2408&height=206"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (result === "Passed") {
                await cadet.roles.add([
                    "1436861503813844993",
                    "1303520421551013910",
                    "1465493511385120941",
                    "1120063570105860167",
                    "1383295729854058666",
                    "1114295664805957724",
                    "1465209143353675899",
                    "1329278799409451029"
                ]);
            }

            await cadet.roles.remove([
                "1109529646384554116",
                "1303520413657206784"
            ]);

            await interaction.reply({
                content: "<:fcso_check:1506063526182125608> **Successfully** logged training.",
                flags: 64
            });
        }

        // =========================
        // RIDEALONG
        // =========================
        if (sub === "ridealong") {

            const cadet = await interaction.guild.members.fetch(
                interaction.options.getUser("cadet").id
            );

            const result = interaction.options.getString("result");
            const feedback = interaction.options.getString("feedback");

            const channel = interaction.guild.channels.cache.get("1464768691664060629");

            await channel.send({
                "flags": 32768,
                "components": [
                    {
                        "type": 17,
                        "components": [
                            {
                                "type": 10,
                                "content": "# <:fcso_briefcase:1501769870889586759> Ride Along Log"
                            },
                            {
                                "type": 14,
                                "spacing": 2
                            },
                            {
                                "type": 10,
                                "content": `A ride along has been logged by ${interaction.user}. View information regarding it below.\n\n<:fcso_people:1501770349694681109> **Cadet:** ${cadet}\n<:fcso_pin:1501770114830434324> **Result:** ${result}\n<:fcso_book:1501785318666276865> **Feedback:** ${feedback}`
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
                                            "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&=&format=webp&quality=lossless&width=2408&height=206"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            await cadet.send({
                "flags": 32768,
                "components": [
                    {
                        "type": 17,
                        "components": [
                            {
                                "type": 10,
                                "content": "# <:fcso_briefcase:1501769870889586759> Ride Along Completed"
                            },
                            {
                                "type": 14,
                                "spacing": 2
                            },
                            {
                                "type": 10,
                                "content": `You have completed your ride along. View information regarding it below.\n\n<:fcso_pin:1501770114830434324> **Result:** ${result}\n<:fcso_book:1501785318666276865> **Feedback:** ${feedback}`
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
                                            "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&=&format=webp&quality=lossless&width=2408&height=206"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (result === "Passed") {
                await cadet.roles.remove("1303520421551013910");
            }

            if (result === "Failed") {
                await cadet.roles.remove([
                    "1436861503813844993",
                    "1303520421551013910",
                    "1465493511385120941",
                    "1120063570105860167",
                    "1383295729854058666",
                    "1114295664805957724",
                    "1465209143353675899",
                    "1329278799409451029"
                ]);
            }

            await interaction.reply({
                content: "<:fcso_check:1506063526182125608> **Successfully** logged ride along.",
                flags: 64
            });
        }
    }
};