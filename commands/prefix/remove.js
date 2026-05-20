module.exports = {
    name: "remove",

    async execute(message, args) {


        const isAdmin = message.member.permissions.has("Administrator");

        if (!isAdmin) {
            return message.reply("<:fsco_xMark:1506499171509866516> You do not have permission to run this command.");
        }

        const userId = args[0];

        if (!userId) {
            return message.reply("<:fsco_xMark:1506499171509866516> Please provide a user ID.");
        }

        const member = await message.guild.members.fetch(userId).catch(() => null);

        if (!member) {
            return message.reply("<:fsco_xMark:1506499171509866516> User not found.");
        }

        // ================= DEPARTMENT ROLES =================
        const DEPT_ROLES = [
            "1109523623615680556",
            "1109523623615680555",
            "1436811752103739402",
            "1109557731515449344",
            "1457943782786859123",
            "1461491529875984444",
            "1109529658908745928",
            "1109523623615680553",
            "1324271492225044490",
            "1110690730130817044",
            "1109523623615680552",
            "1461490715635876001",
            "1483685612639883284",
            "1110688600116428821",
            "1109523623179452455",
            "1461491099196723437",
            "1109523623179452452",
            "1461491160077041839",
            "1436861503813844993",
            "1303520421551013910",
            "1465493511385120941",
            "1120063570105860167",
            "1461145178021564477",
            "1109557992686370936",
            "1469154648433885265",
            "1469154490044125450",
            "1383295729854058666",
            "1120612626947395604",
            "1465493912633475224",
            "1465493486898778184",
            "1465494024692437053",
            "1120612903976960110",
            "1465493978857214124",
            "1465494107601506428",
            "1444793728568135780",
            "1114295664805957724",
            "1437091249550000260",
            "1381103991940972627",
            "1465209143353675899",
            "1329278799409451029",
            "1461491848001355929",
            "1465079478995910919",
            "1465080116538507416",
            "1465079602597728491",
            "1465079680477565123",
            "1465079753571827982",
            "1465079807523033336",
            "1461493677095653447",
            "1298848312585224212",
            "1120610879554195487",
            "1436811781728239749",
            "1109529646384554116",
            "1303520413657206784",
            "1120610381614821439"


        ];
        const logChannel = message.guild.channels.cache.get("1506675770494423090");
        await logChannel.send({
  "flags": 32768,
  "components": [
    {
      "type": 17,
      "components": [
        {
          "type": 10,
          "content": "# <:fcso_briefcase:1501769870889586759> Removal Log"
        },
        {
          "type": 14,
          "spacing": 2
        },
        {
          "type": 10,
          "content": `${message.author} has removed a user. View information regarding it below.\n\n<:fcso_people:1501770349694681109> **User:** ${member}`
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
                "url": "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a0f158c&is=6a0dc40c&hm=114a26384989fd0dff410bf17372ae241e4599802243388a55d6b924b581d6a0&=&format=webp&quality=lossless&width=1768&height=152"
              }
            }
          ]
        }
      ]
    }
  ]
});
    await member.send("<:fcso_bell:1504698291139641354> You have been **removed** from the <:FCSO:1114242855557402675> **Florence County Sheriff's Office**.")

        // ================= SAVE ROLES =================
        const removedRoles = member.roles.cache
            .filter(role => DEPT_ROLES.includes(role.id))
            .map(role => role.id);

        if (!removedRoles.length) {
            return message.reply("<:fsco_xMark:1506499171509866516> This user does not have any department roles.");
        }

        // create storage if missing
        if (!message.client.removedRoles) {
            message.client.removedRoles = new Map();
        }

        message.client.removedRoles.set(member.id, removedRoles);

        // remove roles
        await member.roles.remove(removedRoles);

        message.reply(
            `<:fcso_check:1506063526182125608> **Successfully** removed all department roles from ${member}.`
        );
    }
};