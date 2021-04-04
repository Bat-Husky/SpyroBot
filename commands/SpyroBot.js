const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const djsImg = new Discord.MessageAttachment('../ReBot_test/Img/discord-js.png')
const ppImg = new Discord.MessageAttachment('../ReBot_test/Img/spyrobot_v1.png')

module.exports = class SpyroBot extends commands {

    static match (message) {
        return message.content.toString().toLowerCase().startsWith('r/spyrobot')
    }

    static action (message) {
        const embed = new MessageEmbed()
              .setColor("#0042ff")
              .setTitle("SpyroBot")
              .setURL("https://docs.google.com/document/d/1uSBdN_1_jUk0arHGbWB0kMjv6YJGQTgoLKO2QhjjhK8/edit?usp=sharing")
              .setDescription("Le Grand Bot SpyroBot")
              .setThumbnail('https://media.discordapp.net/attachments/575712614097879050/799944045778436107/spyrobot_v1.png?width=670&height=670')
              .addField("Créateur :", "[Bat Husky](https://discord.gg/kcb3jke)")
              .addField('\u200b', '\u200b')
              .addFields(
                { name: 'Langage :', value: 'javascipt', inline: true },
                { name: 'Librairie :', value: 'discord.js', inline: true }
              )
              .attachFiles(djsImg)
              .setImage('attachment://discord-js.png')
        message.channel.send(embed);
    }
}