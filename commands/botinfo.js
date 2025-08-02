const Discord = require('discord.js')
const fs = require('fs')

module.exports = class SpyroBot {

    static parse (message, prefix, bot) {
        if (this.match(message, prefix)) {
            this.action(message, prefix, bot)
            return true
        }
        return false
    }

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}info`)
    }

    static action (message, prefix, bot) {
      const embed = new EmbedBuilder()
        .setColor("#5465FF")
        .setTitle("SpyroBot Info")
        .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
        .setDescription("Hi! I am SpyroBot! \nI am a multi-tasking bot developed by `Bat-Husky`. \nI have `🛡 moderation` and `🔊 music` commands. I also have other `☣ Useless` but funny commands. \nFor more info about commands, use the command $help.")
        .setThumbnail('https://media.discordapp.net/attachments/575712614097879050/799944045778436107/spyrobot_v1.png?width=670&height=670')
        .addFields([{ name: '\u200b', value: '\u200b' }])
        .addFields([
          { name: 'Library :', value: '`discord.js`', inline: true },
          { name: 'Prefix :', value: '`$`', inline: true },
          { name: 'Running on :', value: `\`${bot.guilds.cache.size} servers\``, inline: true }
        ])
        message.channel.send({ embeds: [embed] });
    }
}
