const Discord = require('discord.js');
const client = new Discord.Client();
const { TOKEN, PREFIX } = require("./config");

const commands = require("./commands");

client.on('ready', () => {
    client.commands = commands;
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.guild || !msg.content.startsWith(PREFIX)) return;
    var args = msg.content.slice(PREFIX.length).split(" ");
    var cmd = args.shift();
    
    const cmdModule = commands.find(m => m.triggers && m.triggers.includes(cmd));
    if (!cmdModule) {
        return msg.channel.send({embed:{
            title: "Команда не найдена",
            description: `У меня нет такой команды!\n\`${PREFIX}help\` для списка всех команд`,
            color: 0xff0000,
            image: {
                url: "https://i.imgur.com/a2o82pa.png"
            }
        }});
    };

    try {
        var res = cmdModule.handler.call(cmdModule, msg, client, args);
        if (!res) {
            msg.channel.send({embed:{
                title: `Команда ${cmdModule.name} введена неверно`,
                description: `\`\`\`\n${cmdModule.usage.replace("%prefix%", PREFIX)}\n\`\`\``,
                color: 0xff0000,
                image: {
                    url: "https://i.imgur.com/a2o82pa.png"
                }
            }});
        };
    } catch(e) {
        console.error(e);
        msg.channel.send({embed:{
            title: `Ошибка при выполнении команды ${cmdModule.name}`,
            description: `\`\`\`js\n${e.name}\n${e.message}\n\`\`\``,
            color: 0xff0000,
            image: {
                url: "https://i.imgur.com/5U0Qp8h.png"
            }
        }});
    };
});

client.login(TOKEN);