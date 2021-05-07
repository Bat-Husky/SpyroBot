const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Help extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}help`)
    }

    static action (message) {
        const embed = new MessageEmbed()
              .setColor("#0042ff")
              .setTitle("SpyroBot's Commands")
              .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`.")
              .addField('\u200b', '\u200b')
              .addField("☣ Useless  :", "`$givexp` : cette commande vous troll, tout simplement. \n`$tonbotestmalfoutu` : ne sert à rien. \n`$SpyroBot` : pour avoir des détails inutiles sur le Bot. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$diagonale` : Insulte la diagonale.")
              .addField('\u200b', '\u200b')
              .addField("🛡 Modération :", "`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs. \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")
              .addField('\u200b', '\u200b')
              .addField("🔊 Vocal :", "`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name> ; défini le channel de la queue.")
          message.channel.send(embed);
    }
}