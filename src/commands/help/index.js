const { PREFIX } = require("../../config");

module.exports = {
    name: "Help",
    description: "Открывает список всех команд",
    usage: "%prefix%help (command)",
    triggers: ["help"],
    handler: function(msg, client, args) {
        const fields = client.commands.map(cmd => {
            return {
                name: cmd.name,
                value: `${cmd.description}\n\`\`\`\n${cmd.usage.replace("%prefix%", PREFIX)}\n\`\`\`${cmd.triggers.length>1?`\nСинонимы:\`${cmd.triggers.join(" | ")}\``:''}`
            };
        });
        msg.channel.send({embed: {
            title: "Список всех команд",
            description: "```\n<> - Обязательно\n() - Необязательно\n</> - один из\n```",
            fields: fields,
            color: 0xfff000,
            image: {
                url: "https://i.imgur.com/szUpbVX.png"
            }
        }});
        return true;
    }
};