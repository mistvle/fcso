module.exports = {
    name: "support",

    async execute(message) {

        const CHANNEL_ID = "1109912992675549355";

        if (!message.member.permissions.has("Administrator")) {
            return message.reply("<:xMark:1502740326668828703> You do **not** have **permission** to use this command.");
        }
        await message.delete();

        const channel = message.guild.channels.cache.get(CHANNEL_ID);
        if (!channel) return;

        await channel.send({
            flags: 32768,
            components: [
                {
                    type: 17,
                    components: [
                        {
                            type: 12,
                            items: [
                                {
                                    media: {
                                        url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384484642968/Copy_of_Copy_of_GG_-_11.png?ex=6a072c8d&is=6a05db0d&hm=8316a32134ec9fc204844ccb56a215c8f97bfd66d494aba5e33fe19a87e7403f&=&format=webp&quality=lossless&width=1768&height=624"
                                    }
                                }
                            ]
                        },
                        {
                            type: 14,
                            spacing: 2
                        },
                        {
                            type: 10,
                            content: "If you need assistance, do hesitate to contact our team using one of the ticket options below. Ensure to use the correct type of ticket to avoid moderation.\n\n## <:fcso_qmark:1501770231524098119> General Support\n- General Support is used for general inquiries or questions regarding the department.\n- This is also used for inquiries that can be answered by Supervisors or the Command Team.\n\n## <:fcso_qmark:1501770231524098119> Internal Affairs\n- Internal Affairs is used for deputy reports.\n- You must have **sufficient** evidence prior to opening a report ticket. If you do not have evidence of deputy misconduct, your ticket will be closed.\n\n## <:fcso_people:1501770349694681109> Administration Assistance\n- Administration Assistance should be used for inquiries that require Administration support.\n- Opening this ticket type for an inquiry that can be answered via a General Support ticket will result in moderation."
                        },
                        {
                            type: 14,
                            divider: false
                        },
                        {
                            type: 1,
                            components: [
                                {
                                    type: 3,
                                    options: [
                                        {
                                            label: "General Support",
                                            value: "general_support",
                                            description: "Open a General Support ticket.",
                                            emoji: {
                                                id: "1501770231524098119",
                                                name: "fcso_qmark"
                                            }
                                        },
                                        {
                                            label: "Internal Affairs",
                                            value: "internal_affairs",
                                            description: "Open an Internal Affairs ticket.",
                                            emoji: {
                                                id: "1501770151937310871",
                                                name: "fcso_judgement"
                                            }
                                        },
                                        {
                                            label: "Administration Assistance",
                                            value: "admin_assistance",
                                            description: "Open an Administration Assistance ticket.",
                                            emoji: {
                                                id: "1501770349694681109",
                                                name: "fcso_people"
                                            }
                                        }
                                    ],
                                    placeholder: "Open a Ticket",
                                    custom_id: "support_menu",
                                    min_values: 1,
                                    max_values: 1
                                }
                            ]
                        },
                        {
                            type: 14,
                            spacing: 2
                        },
                        {
                            type: 12,
                            items: [
                                {
                                    media: {
                                        url: "https://media.discordapp.net/attachments/1493677741801996488/1502496384002031706/Copy_of_Copy_of_GG_-_13.png?ex=6a072c8c&is=6a05db0c&hm=9820a4ae907974f7c80b14191aae8a92acbd0a9601845beb597e46de98cb35d5&=&format=webp&quality=lossless&width=1768&height=152"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

    }
}