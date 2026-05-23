module.exports = {
    customId: "keep_open",

    async execute(interaction) {

        const rows = interaction.message.components.map(row => ({
            type: 1,
            components: row.components.map(button => ({
                type: 2,
                style: button.style,
                label: button.label,
                custom_id: button.customId,
                disabled:
                    button.customId === "keep_open" ||
                    button.customId === "close_ticket"
            }))
        }));

        await interaction.update({
            content: "<:fcso_bell:1504698291139641354> The ticket owner has decided to keep this ticket open.",
            components: rows
        });
    }
};