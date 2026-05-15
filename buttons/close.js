const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  customId: "close_ticket",

  async execute(interaction) {

    const isAdmin = interaction.member.permissions.has("Administrator");
    const hasRole = interaction.member.roles.cache.has("1502473793497469009");

    if (!isAdmin && !hasRole) {
      return interaction.reply({
        content: "<:xMark:1502740326668828703> You must be an employee to close this ticket.",
        flags: 64
      });
    }

    // ✅ FIX: allow claimed + unclaimed tickets
    if (!interaction.channel.topic || !/^\d+(\|\d+)?$/.test(interaction.channel.topic)) {
      return interaction.reply({
        content: "<:xMark:1502740326668828703> You can only close a ticket.",
        flags: 64
      });
    }

    try {

      const channel = interaction.channel; // ✅ FIX
      const [ownerId] = (channel.topic || "").split("|"); // ✅ FIX

      const user = await interaction.client.users
        .fetch(ownerId)
        .catch(() => null);

      // =========================
      // DM USER (FULL — YOUR IMAGE KEPT)
      // =========================
      if (user) {
        await user.send({
          "flags": 32768,
          "components": [
            {
              "type": 17,
              "components": [
                {
                  "type": 10,
                  "content": "# <:fcso_bell:1504698291139641354> Ticket Closed"
                },
                {
                  "type": 10,
                  "content": "Your ticket in **Florence County Sheriff's Office** has been closed. If you need further assistance, do not hesitate to contact us again. We hope you enjoyed your experience with our team."
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

      await interaction.reply({
        content: "<a:fcso_loading:1504703436174917724> Closing ticket...",
        flags: 64
      });

      const logChannel = interaction.guild.channels.cache.get("1110716500387561583");

      // =========================
      // GET INQUIRY FROM PANEL
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

      // =========================
      // LOG EMBED (YOUR DESIGN KEPT)
      // =========================
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
**Closed By:** ${interaction.user}`
      };

      await logChannel.send({
        embeds: [embed],
        files: [attachment]
      });

      // =========================
      // DELETE CHANNEL
      // =========================
      setTimeout(() => {
        channel.delete().catch(() => {});
      }, 3000);

    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "<:xMark:1502740326668828703> An error occurred.",
          flags: 64
        }).catch(() => {});
      } else {
        await interaction.reply({
          content: "<:xMark:1502740326668828703> An error occurred.",
          flags: 64
        }).catch(() => {});
      }
    }
  }
};