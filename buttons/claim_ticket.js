module.exports = {
    customId: "claim_ticket",

    async execute(interaction) {

        const components = interaction.message.components[0].components;

        const buttonRowIndex = components.findIndex(c => c.type === 1);

        components[buttonRowIndex] = {
            type: 1,
            components: [
                {
                    style: 4,
                    type: 2,
                    label: "Unclaim",
                    custom_id: "unclaim_ticket"
                },
                components[buttonRowIndex].components[1]
            ]
        };

        await interaction.update({
            components: [
                {
                    type: 17,
                    components
                }
            ]
        });

        await interaction.followUp({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `<:check:1502740417370787881> ${interaction.user} has claimed this ticket.`
        }
      ]
    }
  ]
});
    }
}