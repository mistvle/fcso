const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("View a list of the bot's commands."),

  async execute(interaction) {

    const prefixCommands = interaction.client.prefixCommands;
    const slashCommands = interaction.client.slashCommands;

    // 🔹 PREFIX COMMANDS
    const prefixList = prefixCommands.map(cmd => `\`-${cmd.name}\``).join(", ");

    // 🔹 SLASH COMMANDS + SUBCOMMANDS
    const slashList = slashCommands.map(cmd => {

      const data = cmd.data;

      // no subcommands
      if (!data.options || data.options.length === 0) {
        return `\`/${data.name}\``;
      }

      // 🔥 WITH SUBCOMMANDS
      const subs = data.options
        .filter(o => o.type === 1) // SUBCOMMAND
        .map(o => `\`${data.name} ${o.name}\``)
        .join(", ");

      return subs || `\`/${data.name}\``;

    }).join("\n");

    return interaction.reply({
      flags: 32832,
      components: [
        {
          type: 17,
          components: [
            {
              type: 10,
              content: "# <:fcso_clipboard:1502812608615551006> Command Help"
            },
            {
              type: 14,
              spacing: 2
            },
            {
              type: 10,
              content:
`**Prefix Commands:**
${prefixList}

**Slash Commands:**
${slashList}`
            },
            {
              type: 14,
              spacing: 2
            },
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
  }
};