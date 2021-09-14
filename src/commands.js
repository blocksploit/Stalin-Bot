const fs = require("fs");

const commands = [];

for (let cmdDir of fs.readdirSync(__dirname + "/commands")) {
    try {
        const cmd = require(__dirname + "/commands/" + cmdDir);
        commands.push(cmd);
    } catch(e) {
        console.error(e);
        process.exit();
    };
};

module.exports = commands;