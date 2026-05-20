module.exports = {
  name: "interactionCreate",

  async execute(client, interaction) {
    try {

      if (interaction.isChatInputCommand()) {

        console.log(
          `[SLASH] ${interaction.user.tag} used /${interaction.commandName}`
        );

        const cmd = client.slashCommands.get(interaction.commandName);

        if (cmd) await cmd.execute(interaction);
      }

      if (interaction.isButton()) {

        console.log(
          `[BUTTON] ${interaction.user.tag} clicked ${interaction.customId}`
        );

        const btn = client.buttons.get(interaction.customId);

        if (btn) await btn.execute(interaction);
      }

      if (interaction.isStringSelectMenu()) {

        console.log(
          `[MENU] ${interaction.user.tag} used ${interaction.customId}`
        );

        const menu = client.menus.get(interaction.customId);

        if (menu) await menu.execute(interaction);
      }

      if (interaction.isModalSubmit()) {

        console.log(
          `[MODAL] ${interaction.user.tag} submitted ${interaction.customId}`
        );

        const modal = client.modals.get(interaction.customId);

        if (modal) await modal.execute(interaction);
      }

    } catch (err) {
      console.error(err);

      if (!interaction.replied) {
        interaction.reply({
          content: "<:fsco_xMark:1506499171509866516> An error occurred.",
          ephemeral: true
        });
      }
    }
  }
};