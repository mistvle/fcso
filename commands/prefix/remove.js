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