const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Help extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}help`)
    }

    static action (message) {
        const top = new MessageEmbed()
            .setColor("#0042ff")
            .setTitle("SpyroBot's Commands")
            .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`.")
         
        const general = new MessageEmbed()
            .setColor("#0042ff")
            .setTitle("Général :")
            .setDescription("`$info` : Donne des info sur le bot. \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")

        const useless = new MessageEmbed()
            .setColor("#0042ff")
            .setTitle("☣ Useless  :")
            .setDescription("`$Givexp` : cette commande vous troll, tout simplement. \n`$tonbotestmalfoutu` : ne sert à rien. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$FaitsDivers` : Vous donne des faits divers. \n`$run info` : Donne des infos sur la commande run. \n`$diagonale` : Insulte la diagonale.")
        
        const moderation = new MessageEmbed()
            .setColor("#0042ff")
            .setTitle("🛡 Modération :")
            .setDescription("`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs.")

        const voice = new MessageEmbed()
            .setColor("#0042ff")
            .setTitle("🔊 Vocal :")
            .setDescription("`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name>")
        
        if (message.content.toString().toLowerCase().split(' ')[1] == "mp" || message.content.toString().toLowerCase().split(' ')[1] == "dm") return message.author.send(top) && message.author.send(general) && message.author.send(useless) && message.author.send(moderation) && message.author.send(voice)
        return message.channel.send(top) && message.channel.send(general) && message.channel.send(useless) && message.channel.send(moderation) && message.channel.send(voice)
    }
}