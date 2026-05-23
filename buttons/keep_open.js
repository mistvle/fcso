module.exports = {
    customId: "keep_open",

    async execute(interaction) {

        const row = interaction.message.components[0];

        const updatedRow = {
            type: 1,
            components: row.components.map(button => ({
                ...button.data,
                disabled: button.customId === "keep_open" || button.customId === "close_ticket"
            }))
        };

        await interaction.update({
            content: "<:fcso_bell:1504698291139641354> The ticket owner has decided to keep this ticket open.",
            components: [updatedRow]
        });
    }
}