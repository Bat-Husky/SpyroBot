const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Help extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}help`)
    }

    static action (message) {
        const top = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("SpyroBot's Commands")
            .setDescription("Voici toutes les commandes de SpyroBot, le préfix du bot est `$`. \nVous pouvez pin un message en réagissant à celui-ci avec 📌.")
         
        const general = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("Général :")
            .setDescription("`$info` : Donne des info sur le bot. \n`$Bots` : Donne des infos sur les bots. \n`$Rank` : Donne le niveau et le rang. \n`$Rules` : Lis les règles ! \n`$Spyro` : $Spyro <code|github|history> ; Donne des infos \n`$Open[Pattern/Code/Info]` : Donne des infos sur OpenBot. \n`$Constitution` : Envoie le fichier de la constitution. \n`$Coin info` : Donne des info sur la commande $coin \n`$cmdStatus` permet de désactiver certaines commandes \n`$Crash` : Fais crash le bot (Admin only) \n`$Ping` : Ping le bot (Admin only)")

        const useless = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("☣ Useless  :")
            .setDescription("`$Givexp` : cette commande vous troll, tout simplement. \n`$tonbotestmalfoutu` : ne sert à rien ; rajouter set pour modifier. \n`$baka` : $baka <@user> ; insulte les autres. \n`$meme` : envoie des memes \n`$FaitsDivers` : Vous donne des faits divers. \n`$run info` : Donne des infos sur la commande run. \n`$diagonale` : Insulte la diagonale.")
        
        const moderation = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("🛡 Modération :")
            .setDescription("`$Ban` : $Ban <@user> \n`$Kick` : $Kick <@user> \n`$Warn` : $Warn <@user> <reason> \n`$Infractions` : $Infractions <@user> \n`$Clear` : $Clear <amount> ; max 100 \n`$Report` : $Report <user> <reason> ; (everyone) \n`$LogsChannel` : $LogsChannel <id or name> ; défini le channel des logs.")

        const voice = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("🔊 Vocal :")
            .setDescription("`$Play` : $Play <link> \n`$Skip` : passe à la musique suivante. \n`$Queue` : donne la liste des chansons sur la queue. \n`$Volume` : $volume <number> \n`$Loop` : Répète les musiques de la queue. \n`$Leave` : quitte le channel. \n`$SetQueueChannel` : $SetQueueChannel <id or name>")
        
        const slashHelp = new MessageEmbed()
            .setColor("#5465FF")
            .setTitle("Slash Commands")
            .setDescription("__**Commands :**__ \n`info` \n`help` \n`bots` \n`ping` \n`baka` \n`faitsdivers` \n`warn` \n`infractions` \n`report` \n`clear` \n`rank`")

        if (message.content.toString().toLowerCase().split(' ')[1] == "mp" || message.content.toString().toLowerCase().split(' ')[1] == "dm") return message.author.send({ embeds: [top] }) && message.author.send({ embeds: [general] }) && message.author.send({ embeds: [useless] }) && message.author.send({ embeds: [moderation] }) && message.author.send({ embeds: [voice] })
        if (message.content.toString().toLowerCase().split(' ')[1] == "slash") {
            if (message.content.toString().toLowerCase().split(' ')[2] == "mp" || message.content.toString().toLowerCase().split(' ')[2] == "dm") return message.author.send({ embeds: [slashHelp] })
            // return message.channel.send(slashHelp)
            return message.channel.send({ embeds: [slashHelp] })
        }
        // return message.channel.send(top) && message.channel.send(general) && message.channel.send(useless) && message.channel.send(moderation) && message.channel.send(voice)
        return message.channel.send({ embeds: [top] }) && message.channel.send({ embeds: [general] }) && message.channel.send({ embeds: [useless] }) && message.channel.send({ embeds: [moderation] }) && message.channel.send({ embeds: [voice] })
    }
}