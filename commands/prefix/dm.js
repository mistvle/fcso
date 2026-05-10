const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require("discord.js");

module.exports = {
  name: "dm",

  async execute(message, args) {
    if (message.author.bot) return;

const LOG_CHANNEL_ID = "1109523625431805973";

const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
if (!isAdmin) {
  return message.reply("<:xMark:1502740326668828703> You do not have permission to use this command.");
}

const userId = args[0];
const text = args.slice(1).join(" ");

if (!userId || !text) {
  return message.reply("<:xMark:1502740326668828703> Failed to fetch a valid user ID or message.");
}

let user;
try {
  user = await message.client.users.fetch(userId);
} catch (err) {
  return message.reply("<:xMark:1502740326668828703> Invalid user ID.");
}

// optional ActionRow (not required if using your raw components)
const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId("dm_reply")
    .setLabel("Reply")
    .setStyle(ButtonStyle.Secondary)
);

try {
  await user.send({
    flags: 32768,
    components: [
      {
        type: 17,
        components: [
          { type: 10, content: "# <:fcso_bot:1502812637984067604> Direct Message" },
          { type: 14, spacing: 2 },
          {
            type: 10,
            content:
              "A message has been sent to you by our **Administration Team**. Ensure to reply as soon as possible if prompted to. Use the button below to reply."
          },
          { type: 14, divider: false },
          {
            type: 9,
            components: [
              {
                type: 10,
                content: `**Message**: \`${text}\``
              }
            ],
            accessory: {
              style: 2,
              type: 2,
              label: "Reply",
              custom_id: "dm_reply"
            }
          },
          { type: 14, spacing: 2 },
          {
            type: 12,
            items: [
              {
                media: {
                  url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a00950c&is=69ff438c&hm=f649ac59044116ca7ab9fef41098da0ae4ecaad67feaece2d26235e9953916ec&=&format=webp&quality=lossless&width=1768&height=152"
                }
              }
            ]
          }
        ]
      }
    ]
  });

  const channel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
  if (channel) {
    channel.send({
      flags: 32768,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: "# <:fcso_folder:1501785273091100833> Message Log" },
            { type: 14, spacing: 2 },
            {
              type: 10,
              content: `A message has been sent by ${message.author} using the bot.\n\n**User**: ${user}\n**Message**: ${text}`
            },
            { type: 14, spacing: 2 },
            {
              type: 12,
              items: [
                {
                  media: {
                    url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a00950c&is=69ff438c&hm=f649ac59044116ca7ab9fef41098da0ae4ecaad67feaece2d26235e9953916ec&=&format=webp&quality=lossless&width=1768&height=152"
                  }
                }
              ]
            }
          ]
        }
      ]
    }).catch(() => {});
  }

  return message.reply(`<:check:1502740417370787881> **Successfully** sent message to <@${userId}>.`);
} catch (err) {
  console.error("DM command error:", err);
  return message.reply("<:xMark:1502740326668828703> Failed to messge user.");
}

  }
}