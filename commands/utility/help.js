const Discord = require('discord.js')
const fs = require("fs");
const { PREFIX } = require("../../config.js");
const db = require('old-wio.db');
const { stripIndents } = require("common-tags");
const { support } = require("../../config.json");

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['h']
},
run: async (bot, message, args) => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
    
    try {

    let Categories = ["admin", "fun", "images", "info", "mod", "utility"],
    AllCommands = [];

const Emotes = {
    admin: "<a:ap_abhi_op:955159323414241390>Admin",
    fun: "<a:ap_abhi_op:955159323414241390>Fun",
    images: "<a:ap_abhi_op:955159323414241390>Images",
    info: "<a:ap_abhi_op:955159323414241390>Info",
    mod: "<a:ap_abhi_op:955159323414241390>Mod",
    utility: "<a:ap_abhi_op:955159323414241390>Utility"
};


for (let i = 0; i < Categories.length; i++) {
    const Cmds = await bot.commands.filter(C => C.config.category === Categories[i]).array().map(C => C.config.name).sort((a, b) => a < b ? -1 : 1).join(", ");
    AllCommands.push(`\n\n**${Emotes[Categories[i]]}**\n\`\`\`${Cmds}\`\`\``);
};

const Description = `My Prefix Is **${prefix}**\n\nFor More Command Information, Type The Following Command:\n**${prefix}help <command Name> or** <@${bot.user.id}> **help <command name>**`;

const Embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setImage(`https://images-ext-1.discordapp.net/external/9Du8xdRXMw7nncVsq2yhaOs1aUcMyySInQBwBb0pXJM/https/cdn-longterm.mee6.xyz/plugins/welcome/images/954672171291119656/1db591cecc44d56ddd4eb161c3887a7f33b3922b080aa4e83d40985cd5e10c13.gif`)
    .setAuthor("Commands", message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(Description + AllCommands.join("") + "" + "\n\n" + `[Invite Me](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`)
    .setFooter(`Requested by ${message.author.username}`, bot.user.displayAvatarURL())
    .setTimestamp();

if (!args[0]) return message.channel.send(Embed);

else {
    const embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(bot.user.displayAvatarURL())

    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`\n
    ** Description -** \`${command.description || "No Description provided."}\`\n
    ** Usage -** [   \`${command.usage ? `${command.usage}` : "No Usage"}\`   ]\n
    ** Examples -** \`${command.example ? `${command.example}` : "No Examples Found"}\`\n
    ** Aliases -** [ \`${command.aliases ? command.aliases.join(" , ") : "None."}\` ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send(embed)
};
} catch (e) {
  console.log(e);
};

    

}

}