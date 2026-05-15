module.exports = {
    customId: "claim_ticket",

    async execute(interaction) {

        const data = JSON.parse(JSON.stringify(interaction.message.components));

        const container = data[0];

        const buttonRow = container.components.find(c => c.type === 1);

        buttonRow.components[0] = {
            style: 4,
            type: 2,
            label: "Unclaim",
            custom_id: "unclaim_ticket"
        };

        await interaction.update({
            flags: 32768,
            components: data
        });

        await interaction.followUp({
            flags: 32768,
            components: [
                {
                    type: 17,
                    components: [
                        {
                            type: 10,
                            content: `<:check:1502740417370787881> ${interaction.user} has claimed this ticket.`
                        }
                    ]
                }
            ]
        });
    }
}