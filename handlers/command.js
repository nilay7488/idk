const fs = require('fs');

module.exports = (bot) => {
    const load = dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}/`).filter(cmd => cmd.endsWith('.js'));
        for (let cmd of commands) {
            let pull = require(`../commands/${dirs}/${cmd}`);
            bot.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(cmd => bot.aliases.set(cmd, pull.config.name));
        };
    };
    ["admin", "fun", "images", "utility", "owner", "mod", "fun", "info", "ai-chat"].forEach(cmd => load(cmd));
};
let noPrefix = ['553934203352383490','882287539094970418','842279130943062026','928712522821959681','830662633806889001','808621476542414860','755822936216305685'];
