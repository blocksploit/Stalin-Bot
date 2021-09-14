module.exports = {
    name: "Ping",
    description: "Возвращяет пинг бота в ms",
    usage: "%prefix%ping",
    triggers: ["ping"],
    handler: function(msg, client, args) {
        msg.channel.send({embed: {
            title: "Пинг",
            description: `Мой пинг: **${Math.round(client.ws.ping)}ms**`,
            color: 0xff0000,
            image: {
                url: "https://i.imgur.com/szUpbVX.png"
            }
        }});
        return true;
    }
};