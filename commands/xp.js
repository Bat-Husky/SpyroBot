const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');

module.exports = {
    async execute(user, content, prefix, bot) {
        if (talkedRecently.has(message.author.id)) return;

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);

        let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));
    }
}