module.exports = {
    customId: "unclaim_ticket",

    async execute(interaction) {

        const components = interaction.message.components[0].components;

        const buttonRowIndex = components.findIndex(c => c.type === 1);

        components[buttonRowIndex] = {
            type: 1,
            components: [
                {
                    style: 3,
                    type: 2,
                    label: "Claim",
                    custom_id: "claim_ticket"
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
          "content": `<:xMark:1502740326668828703> ${interaction.user} has unclaimed this ticket.`
        }
      ]
    }
  ]
});
    }
}