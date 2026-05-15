const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = {
    customId: "support_menu",

    async execute(interaction) {

        const value = interaction.values[0];

        // GENERAL SUPPORT
        if (value === "general_support") {

            const modal = new ModalBuilder()
            .setCustomId("general_support_modal")
            .setTitle("General Support");

            const inquiry = new TextInputBuilder()
            .setCustomId("inquiry")
            .setLabel("How can we help?")
            .setPlaceholder("I need help with...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(inquiry)
            );

            return interaction.showModal(modal);
        }

        // IA
        if (value === "internal_affairs") {

            const modal = new ModalBuilder()
            .setCustomId("ia_modal")
            .setTitle("Internal Affairs");

            const callsign = new TextInputBuilder()
            .setCustomId("callsign")
            .setLabel("Deputy Callsign")
            .setPlaceholder("C-02")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

            const username = new TextInputBuilder()
            .setCustomId("username")
            .setLabel("Deputy's Roblox Username")
            .setPlaceholder("mistvle")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

            const reason = new TextInputBuilder()
            .setCustomId("reason")
            .setLabel("Reason")
            .setPlaceholder("Use of Force Violation")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(callsign),
                new ActionRowBuilder().addComponents(username),
                new ActionRowBuilder().addComponents(reason)
            );

            return interaction.showModal(modal);
        }

        // ADMIN
        if (value === "admin_assistance") {

            const modal = new ModalBuilder()
            .setCustomId("admin_modal")
            .setTitle("Administration Assistance");

            const inquiry = new TextInputBuilder()
            .setCustomId("inquiry")
            .setLabel("How can we help?")
            .setPlaceholder("I need help with...")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

            modal.addComponents(
                new ActionRowBuilder().addComponents(inquiry)
            );

            return interaction.showModal(modal);
        }
    }
}