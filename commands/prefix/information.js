module.exports = {
    name: "information",

    async execute (message) {
        if (!message.member.permissions.has("Administrator")) {
            return
        }
        const channel = message.guild.channels.cache.get("1303028709766332436");
        await message.delete();
        await channel.send({
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
                "url": "https://cdn.discordapp.com/attachments/1493677741801996488/1502496385768095816/Copy_of_Copy_of_GG_-_1.png?ex=6a07d54d&is=6a0683cd&hm=06c3d50b06095ec30026a18eda5daf8c544b24bf111cf9746470aee0394bce50&",
                "proxy_url": "https://media.discordapp.net/attachments/1493677741801996488/1502496385768095816/Copy_of_Copy_of_GG_-_1.png?ex=6a07d54d&is=6a0683cd&hm=06c3d50b06095ec30026a18eda5daf8c544b24bf111cf9746470aee0394bce50&",
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
          "content": "## <:fcso_info:1501785404569948180> Information\nThe Florence County Sheriff’s Office, a county law enforcement agency, prioritizes highway safety and public protection. Deputies are specially trained to safeguard communities from crime. Join the FCSO today and make a difference."
        },
        {
          "id": 5,
          "type": 14,
          "divider": true,
          "spacing": 2
        },
        {
          "id": 6,
          "type": 10,
          "content": "<:fcso_link:1501789587062784160> **Server Links**\n*Useful links to help guide your journey throughout FCSO.*\n- [Entry Application](https://melon.ly/form/7419235859683086336)\n- [Employee Roster](https://docs.google.com/spreadsheets/d/1lIonVe6mwKV9sCUQoZsDQCLzRqlNESgWoSnt4IpQcZM/edit?usp=drivesdk)\n- [Announcements](https://discord.com/channels/1109523623179452450/1109523625159184536)\n- [Support](https://discord.com/channels/1109523623179452450/1109912992675549355)\n\n<:fcso_people:1501770349694681109> **Leadership**\n*Department Administration consists of the department's leading members. They lead, make decisions, and ensure all personnel follow policies.*\n<:fcso_sheriff:1505065552647819375> <@1311188604521021453>\n<:fcso_chiefdeputy:1505065606737821846> <@1499915565538611401>\n<:Major:1376656522414653523> <@1258556275017388103>\n<:Major:1376656522414653523> <@1481780445548118098>"
        },
        {
          "id": 7,
          "type": 14,
          "divider": true,
          "spacing": 2
        },
        {
          "id": 13,
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://cdn.discordapp.com/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&",
                "proxy_url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a07d54c&is=6a0683cc&hm=0185fc9dff28ffb42af7441c32a0caad8b06b37b804eb000cdbbd9a66d752649&",
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
          "style": 2,
          "type": 2,
          "label": "Regulations",
          "flow": {
            "actions": []
          },
          "custom_id": "regulations"
        },
        {
          "style": 2,
          "type": 2,
          "label": "F.A.Q",
          "flow": {
            "actions": []
          },
          "custom_id": "faq"
        }
      ]
    }
  ]
})
    }
}