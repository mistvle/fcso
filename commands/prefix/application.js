module.exports = {
    name: "application",
    async execute (message) {
        await message.delete();
        if (!message.member.permissions.has("Administrator")) {
            return message.reply({
  "attachments": [],
  "flags": 32768,
  "components": [
    {
      "id": 1,
      "type": 17,
      "accent_color": null,
      "spoiler": false,
      "components": [
        {
          "id": 2,
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://cdn.discordapp.com/attachments/1493677741801996488/1502496386271150150/Copy_of_Copy_of_GG_-_2.png?ex=6a07d54d&is=6a0683cd&hm=c3b919a04e7c690528c15fb9f73727423e3109eec414697da684da29bfb83037&",
                "proxy_url": "https://media.discordapp.net/attachments/1493677741801996488/1502496386271150150/Copy_of_Copy_of_GG_-_2.png?ex=6a07d54d&is=6a0683cd&hm=c3b919a04e7c690528c15fb9f73727423e3109eec414697da684da29bfb83037&",
                "width": 2040,
                "height": 720,
                "content_type": "image/jpeg"
              },
              "description": null,
              "spoiler": false
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "type": 17,
      "accent_color": null,
      "spoiler": false,
      "components": [
        {
          "id": 4,
          "type": 10,
          "content": "<:FCSO:1114242855557402675> **Department Application**\nInterested in a proper career? If so, you are in the correct place for your answer. Please review the information below to understand how to join the Florence County Sheriff’s Office.\n\n<:fcso_qmark:1501770231524098119> **Why Join Us**\nYou should join the Florence County Sheriff’s Office for multiple reasons. Our department provides a clear focus on crime reduction, realism, & a professional environment. As a deputy you will have a chance to experience a realistic policing environment.\n\n<:fcso_briefcase:1501769870889586759> **Requirements & Conditions:**\n- Must be 14 years or older.\n- Capability of representing FCSO professionally & properly.\n- Ability to run ER:LC smoothly.\n- Basic understanding of South Carolina laws.\n- Must know how to use SPaG.\n- Must have 2,250xp in-game.\n\n<:fcso_book:1501785318666276865> **Perks & Opportunities:**\n- Welcoming & encouraging high ranks.\n- Access to whitelisted divisions (patrol, cid, ceu, etc)\n- Giveaways when activity is high.\n- Access to a variety resources.\n- Frequent award handouts.\n\nInterested in applying? If so apply below."
        },
        {
          "id": 5,
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://cdn.discordapp.com/attachments/1493677741801996488/1502496384232980521/Copy_of_Copy_of_GG_-_12.png?ex=6a07d54d&is=6a0683cd&hm=cb5ba93ceaac85866dcdaa32f8100f549c050ec3cca6dafa693f1a1d16271a92&",
                "proxy_url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384232980521/Copy_of_Copy_of_GG_-_12.png?ex=6a07d54d&is=6a0683cd&hm=cb5ba93ceaac85866dcdaa32f8100f549c050ec3cca6dafa693f1a1d16271a92&",
                "width": 3500,
                "height": 300,
                "content_type": "image/jpeg"
              },
              "description": null,
              "spoiler": false
            }
          ]
        }
      ]
    },
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 5,
          "label": "Entry Application",
          "url": "https://melon.ly/form/7419235859683086336"
        }
      ]
    }
  ]
})
        }
    }
}