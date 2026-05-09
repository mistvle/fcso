module.exports = {
    name: "id",
    
    async execute (message) {
        await message.reply({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": `Your **Discord ID** is \`${message.author.id}\`.`
        }
      ]
    }
  ]
})
    }
}