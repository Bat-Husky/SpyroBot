const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Help extends commands {

    static match (message) {
        return message.content.toString().toLowerCase().startsWith('r/help')
    }

    static action (message) {
        const embed = new MessageEmbed()
              .setColor("#0042ff")
              .setTitle("SpyroBot's Commands")
              .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `/`.")
              .addField('\u200b', '\u200b')
              .addField("☣ Useless  :", "`/givexp` : cette commande vous troll, tout simplement. \n`/tonbotestmalfoutu` : ne sert à rien. \n`/SpyroBot` : pour avoir des détails inutiles sur le Bot. \n`/baka` : /baka <@user> ; insulte les autres. \n`/meme` : envoie des memes")
              .addField('\u200b', '\u200b')
              .addField("🛡 Modération :", "`/Ban` : /Ban <@user> \n`/Kick` : /Kick <@user> \n`/Warn` : /Warn <@user> <reason> \n`/Infractions` : /Infractions <@user> \n`/Clear` : /Clear <amount> ; max 100")
              .addField('\u200b', '\u200b')
              .addField("🔊 Vocal :", "`/Play` : /Play <link> \n`/Skip` : passe à la musique suivante. \n`/Queue` : donne la liste des chansons sur la queue. \n`/Volume` : /volume <number> \n`/Leave` : quitte le channel.")
          message.channel.send(embed);
    }
}