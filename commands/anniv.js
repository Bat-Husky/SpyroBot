const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Anniv extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith("r/l'anniv de mikwel");
    }

    static action (message) {
        const embed = new MessageEmbed()
              .setColor("#0042ff")
              .setTitle("Mikwel")
              .setDescription("Le Grand Mikwelus gentillus")
              .setThumbnail('https://media.discordapp.net/attachments/660946966305570816/814535792633839676/mikwel_2.png')
              .addField("UN JOYEUX ANNIVERSAIRE À :", "NOTRE TRÈS CHER MIKWEL !!!")
        message.channel.send(embed);
        // message.channel.send({ embeds: [embed] });
    }
}