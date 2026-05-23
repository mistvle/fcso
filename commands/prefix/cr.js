module.exports = {
    name: "cr",

    async execute (message) {
        const userId = message.channel.topic;

        const hasRole = message.member.roles.cache.has("1120063570105860167");
        const isAdmin = message.member.permissions.has("Administrator");
        if (!hasRole && !isAdmin) {
            return message.reply("<:fcso_xMark:1506499171509866516> You do not have permission to run this command.")
        }

        await message.delete();
        await message.channel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `# <:fcso_qmark:1501770231524098119> Close Request\n<@${userId}>`
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": "Our team feels you do not need further assistance. If you do not need further assistance, please click the 'Close' button promptly. If you still need further assistance, feel free to click the 'Keep Open' button, and our team will assist you as soon as possible."
        },
        {
          "type": 14,
          "divider": false
        },
        {
          "type": 1,
          "components": [
            {
              "style": 4,
              "type": 2,
              "label": "Close",
              "custom_id": "close_ticket"
            },
            {
              "style": 3,
              "type": 2,
              "custom_id": "keep_open",
              "flow": {
                "actions": []
              },
              "label": "Keep Open"
            }
          ]
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 12,
          "items": [
            {
              "media": {
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a12614c&is=6a110fcc&hm=34b11f71277d3de76f4044a192f34102e0d8bcda3ba13657236b4b0d36b7e2ce&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
})
    }
}