module.exports = {
    name: "Say",
    description: "Говорит от имени бота",
    usage: "%prefix%say <сообщение>",
    triggers: ["say", "echo"],
    handler: function(msg, client, args) {
        if (!args.length) return false;
        msg.delete();
        msg.channel.send(args.join(" "));
        return true;
    }
};