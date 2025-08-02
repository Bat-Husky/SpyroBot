const Discord = require('discord.js')
// const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, EmbedBuilder } = require('discord.js');
const djsImg = new Discord.AttachmentBuilder('./Img/discord-js.png', { name: 'discord-js.png' })
const ppImg = new Discord.AttachmentBuilder('./Img/spyrobot_v1.png', { name: 'spyrobot_v1.png' })

module.exports = class SpyroBot {

    static parse (message, prefix, bot) {
        if (this.match(message, prefix)) {
            this.action(message, prefix, bot)
            return true
        }
        return false
    }

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}spyro`)
    }

    static action (message, prefix, bot) {
        if (message.content.toString().toLowerCase().split(' ')[1] == "code") return this.code(message);
        if (message.content.toString().toLowerCase().split(' ')[1] == "github") return this.GitHub(message);
        if (message.content.toString().toLowerCase().split(' ')[1] == "history") return this.History(message);

        if (!message.content.toString().toLowerCase().startsWith(`${prefix}spyrobot`)) return;

        const embed = new EmbedBuilder()
              .setColor("#0042ff")
              .setTitle("SpyroBot")
              .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
              .setDescription("Le Grand Bot SpyroBot")
              .setThumbnail(bot.user.avatarURL("png"))
              .addFields([
                { name: "Créateur :", value: "[Bat Husky](https://discord.gg/kcb3jke)", inline: false },
                { name: '\u200b', value: '\u200b', inline: false }
              ])
              .addFields([
                { name: 'Langage :', value: 'javascript', inline: true },
                { name: 'Librairie :', value: 'discord.js', inline: true },
                { name: 'Préfix :', value: '`$`', inline: true }
              ])
              .setImage('attachment://discord-js.png')
        // message.channel.send(embed);
        message.channel.send({ embeds: [embed], files: [djsImg] });
    }

    static code (message) {
        const embed = new MessageEmbed()
            .setTitle("SpyroBot")
            .setColor("#5465FF")
            .setDescription("SpyroBot est codé en JavaScript avec la librairie Discord.js, voici un exemple de code pour les intéressés : \n\n```js\nconst commands = require('./commands');\nconst { Client, MessageEmbed } = require('discord.js');\nconst fs = require('fs');\n\n\nmodule.exports = class Infractions extends commands {\n\n    static match (message, prefix) {\n        return message.content.toString().toLowerCase().startsWith(`${prefix}infractions`)\n    }\n\n    static action (message) {\n      let warns = JSON.parse(fs.readFileSync(\"../ReBot_test/JSON/Warning.json\", \"utf8\"));\n\n      if(!message.member.permissions.has(\"MANAGE_MEMBERS\")) return message.reply(\"You can't use that command!\");\n      let wUser = message.guild.member(message.mentions.users.first()) || message.mentions.users.first();\n      if(!wUser) return message.reply(\"Can't find user!\");\n\n      var warned = message.mentions.users.first();\n\n      if(!warns[wUser.id]) return message.reply(\"This user has no warn!\");\n\n      const warnEmbed = new MessageEmbed()\n          .setTitle('Infractions')\n          .setColor(\"#0042ff\")\n          .addField(\"User\", warned)\n          .addField(\"Number of Warnings\", warns[wUser.id].warns)\n      message.channel.send(warnEmbed);\n    }\n}\n```")
        message.channel.send({ embeds: [embed] });
    }

    static GitHub (message) {
        message.channel.send("Le GitHub de SpyroBot : \nhttps://github.com/Bat-Husky/SpyroBot")
    }

    static History (message) {
        message.channel.send("Voici L'Historique de SpyroBot : \nhttps://docs.google.com/document/d/1VJSgnw-fHwb26KB1TmyZVageVWFeAg_D-pFDm0Z_G0E/edit?usp=sharing")
    }
}
