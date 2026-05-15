const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  name: "close",

  async execute(message) {

    const isAdmin = message.member.permissions.has("Administrator");
    const hasRole = message.member.roles.cache.has("1120063570105860167");

    if (!isAdmin && !hasRole) {
      return message.reply({
        content: "<:xMark:1502740326668828703> You do **not** have **permission** to use this command.",
        allowedMentions: { repliedUser: false }
      });
    }

    if (!message.channel.topic || !/^\d+(\|\d+)?$/.test(message.channel.topic)) {
      return message.reply({
        content: "<:xMark:1502740326668828703> You can only close a ticket channel.",
        allowedMentions: { repliedUser: false }
      });
    }

    try {

      const channel = message.channel;
      const [ownerId] = (channel.topic || "").split("|");

      const user = await message.client.users.fetch(ownerId).catch(() => null);

      if (user) {
        await user.send({
          "flags": 32768,
          "components": [
            {
              "type": 17,
              "components": [
                { "type": 10, "content": "# <:fcso_bell:1504698291139641354> Ticket Closed" },
                {
                  "type": 10,
                  "content": "Your ticket in **Florence County Sheriff's Office** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
                },
                { "type": 14, "spacing": 2 },
                {
                  "type": 12,
                  "items": [
                    {
                      "media": {
                        "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=1768&height=152"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }).catch(() => {});
      }

      await message.delete().catch(() => {});
      await message.channel.send("<a:fcso_loading:1504703436174917724> Closing ticket...");

      // =========================
      // GET INQUIRY (same as button version)
      // =========================
      const messages = await channel.messages.fetch({ limit: 10 });

      const panel = messages.find(m =>
        m.components?.[0]?.components?.some(c =>
          c.content?.includes("Inquiry:")
        )
      );

      let inquiry = "N/A";

      if (panel) {
        const textBlock = panel.components[0].components.find(c =>
          c.content?.includes("Inquiry:")
        );

        if (textBlock) {
          const match = textBlock.content.match(/\*\*Inquiry:\*\* (.+)/);
          if (match) inquiry = match[1];
        }
      }

      // =========================
      // TRANSCRIPT
      // =========================
      const attachment = await discordTranscripts.createTranscript(channel, {
        limit: -1,
        returnType: "attachment",
        filename: `transcript-${channel.id}.html`
      });

      const logChannel = message.guild.channels.cache.get("1110716500387561583");

      const embed = {
        title: "Ticket Closed",
        color: 4079169,
        image: {
          url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=1768&height=152"
        },
        description:
`A ticket has been closed. Review information regarding it below.

**Channel Name:** ${channel.name}
**Channel ID:** ${channel.id}
**Inquiry:** ${inquiry || "N/A"}

**Opened By:** <@${ownerId}>
**Closed By:** ${message.author}`
      };

      await logChannel.send({
        embeds: [embed],
        files: [attachment]
      });

      setTimeout(async () => {
        await message.channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      return message.reply({
        content: "<:xMark:1502740326668828703> An error occurred.",
        allowedMentions: { repliedUser: false }
      });
    }
  }
};