const { SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("infraction")
    .setDescription("Manage infractions.")

    // ISSUE
    .addSubcommand(subcommand => subcommand
        .setName("issue")
        .setDescription("Issue an infraction.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Select the user.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("type")
            .setDescription("Select the infraction type.")
            .addChoices(
                { name: "Inactivity Notice", value: "Inactivity Notice"},
                { name: "Notice", value: "Notice" },
                { name: "Warning", value: "Warning" },
                { name: "Strike", value: "Strike" },
                { name: "Suspension", value: "Suspension" },
                { name: "Demotion", value: "Demotion" },
                { name: "Termination", value: "Termination" }
            )
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("reason")
            .setDescription("Provide a reason for the infraction.")
            .setRequired(true)
        )
    )

    // VIEW
    .addSubcommand(subcommand => subcommand
        .setName("view")
        .setDescription("View a user's infractions.")
        .addUserOption(option => option
            .setName("user")
            .setDescription("Select the user.")
            .setRequired(true)
        )
    )

    // REVOKE
    .addSubcommand(subcommand => subcommand
        .setName("revoke")
        .setDescription("Revoke an infraction.")
        .addIntegerOption(option => option
            .setName("id")
            .setDescription("Input the infraction ID.")
            .setRequired(true)
        )
    ),

    async execute(interaction) {


        const hasRole = interaction.member.roles.cache.has("1324271492225044490");

        const isAdmin = interaction.member.permissions.has("Administrator");

        if (!isAdmin && !hasRole) {
            return interaction.reply({
                content: "<:fsco_xMark:1506499171509866516> You do not have permission to run this command.",
                flags: 64
            });
        }

        const sub = interaction.options.getSubcommand();
        const db = interaction.client.db;

        // ================= ISSUE =================

        if (sub === "issue") {

            const user = interaction.options.getUser("user");
            const type = interaction.options.getString("type");
            const reason = interaction.options.getString("reason");

const member = await interaction.guild.members
    .fetch(user.id)
    .catch(() => null);

            const result = db.prepare(`
                INSERT INTO infractions
                (user_id, moderator_id, type, reason)
                VALUES (?, ?, ?, ?)
            `).run(
                user.id,
                interaction.user.id,
                type,
                reason
            );

            const id = result.lastInsertRowid;

            const logChannel = interaction.guild.channels.cache.get("1109523624718762002");
            if (type === "Termination") {
              const DEPT_ROLES = [
            "1109523623615680556",
            "1109523623615680555",
            "1436811752103739402",
            "1109557731515449344",
            "1457943782786859123",
            "1461491529875984444",
            "1109529658908745928",
            "1109523623615680553",
            "1324271492225044490",
            "1110690730130817044",
            "1109523623615680552",
            "1461490715635876001",
            "1483685612639883284",
            "1110688600116428821",
            "1109523623179452455",
            "1461491099196723437",
            "1109523623179452452",
            "1461491160077041839",
            "1436861503813844993",
            "1303520421551013910",
            "1465493511385120941",
            "1120063570105860167",
            "1461145178021564477",
            "1109557992686370936",
            "1469154648433885265",
            "1469154490044125450",
            "1383295729854058666",
            "1120612626947395604",
            "1465493912633475224",
            "1465493486898778184",
            "1465494024692437053",
            "1120612903976960110",
            "1465493978857214124",
            "1465494107601506428",
            "1444793728568135780",
            "1114295664805957724",
            "1437091249550000260",
            "1381103991940972627",
            "1465209143353675899",
            "1329278799409451029",
            "1461491848001355929",
            "1465079478995910919",
            "1465080116538507416",
            "1465079602597728491",
            "1465079680477565123",
            "1465079753571827982",
            "1465079807523033336",
            "1461493677095653447",
            "1298848312585224212",
            "1120610879554195487",
            "1436811781728239749",
            "1109529646384554116",
            "1303520413657206784",
            "1120610381614821439"


        ];

        const removedRoles = member.roles.cache
            .filter(role => DEPT_ROLES.includes(role.id))
            .map(role => role.id);

        if (!removedRoles.length) {
            return interaction.reply({content: "<:fsco_xMark:1506499171509866516> This user is not a department member.", flags: 64});
        }
            }

            // LOG CHANNEL
            const logMessage = await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:fcso_shield:1504628627130548285> Infraction Issued - #${id}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `An infraction has been issued by ${interaction.user}. View details below.\n\n<:fcso_people:1501770349694681109> **User:** ${user}\n<:fcso_pin:1501770114830434324> **Type:** ${type}\n<:fcso_pen:1501769575614775466> **Reason:** ${reason}\n<:fcso_briefcase:1501769870889586759> **Infraction ID:** ${id}`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=2408&height=206"
              }
            }
          ]
        }
      ]
    }
  ]
});
    const thread = await logMessage.startThread({
    name: `Infraction - #${id}`,
    autoArchiveDuration: 10080
});

await thread.send(
    `${interaction.user} Please provide proof for this infraction below.`
);

            // USER DM
            await user.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:fcso_shield:1504628627130548285> Infraction Issued - #${id}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `An infraction has been issued to you. View information regarding it below. If you have inquires regarding your infraction, feel free to open a ticket.\n\n<:fcso_pin:1501770114830434324> **Type:** ${type}\n<:fcso_pen:1501769575614775466> **Reason:** ${reason}\n<:fcso_briefcase:1501769870889586759> **Infraction ID:** ${id}`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=2408&height=206"
              }
            }
          ]
        }
      ]
    }
  ]
}).catch(() => null);

            await interaction.reply({
                content: `<:fcso_check:1506063526182125608> **Successfully** issued infractio **#${id}.`,
                flags: 64
            });
        }

        // ================= VIEW =================

        if (sub === "view") {

            const user = interaction.options.getUser("user");

            const infractions = db.prepare(`
                SELECT * FROM infractions
                WHERE user_id = ?
                ORDER BY id DESC
            `).all(user.id);

            if (!infractions.length) {
                return interaction.reply({
                    content: "<:fsco_xMark:1506499171509866516> No infractions found for this user.",
                    flags: 64
                });
            }

            const formatted = infractions.map(i =>
`### Infraction #${i.id}
- Type: ${i.type}
- Reason: ${i.reason}`
            ).join("\n\n");

            await interaction.reply({
  "flags": 32832,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:fcso_shield:1504628627130548285> Infractions - ${user.username}`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": formatted
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=2408&height=206"
              }
            }
          ]
        }
      ]
    }
  ]
});
        }

        // ================= REVOKE =================

        if (sub === "revoke") {

            const id = interaction.options.getInteger("id");

            const infraction = db.prepare(`
                SELECT * FROM infractions
                WHERE id = ?
            `).get(id);

            if (!infraction) {
                return interaction.reply({
                    content: "<:fsco_xMark:1506499171509866516> Please provide a valid infraction ID.",
                    flags: 64
                });
            }

            db.prepare(`
                DELETE FROM infractions
                WHERE id = ?
            `).run(id);

            await interaction.reply({
                content: `<:fcso_check:1506063526182125608> **Successfully** revoked infraction **#${id}**.`,
                flags: 64
            });
        }
    }
}