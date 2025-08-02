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
        return message.content.toString().toLowerCase().startsWith(`${prefix}ping`)
    }

    static action (message, prefix, bot) {
        if (message.author.id != 467284102987382784) return message.reply("Vous n'avez pas les permissions nécessaires !");
        if (message.guild.id != 621427447879172096) return message.reply("Cette commande n'est pas disponible sur ce serveur.");
        bot.user.setPresence({ activities: [{ name: `${prefix}help` , type: 3 }] });
        const testChannel = message.guild.channels.cache.find(ch => ch.name === 'test');
        let Hours = Math.floor(bot.uptime / 3600000)

        let Minutes = Math.round(((bot.uptime / 60000) - (Hours * 60)) * 1000) / 1000;
        testChannel.send(`\`\`\`fix\nPing réussi ! \n\`\`\` \nUptime : \n\`${Hours} hours\` \n\`${Minutes} minutes\``);
    }
}
