const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Kick extends commands {

    static match (message) {
        return message.content.toString().toLowerCase().startsWith('r/kick')
    }

    static action (message) {
        const user = message.mentions.users.first();
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        message.reply(`J´ai bien expulsé ${user.tag}`, {tts: true});
                    })
                    .catch(err => {
                        message.reply("Je ne peux pas l'expulser");
                        console.error(err);
                    });
                } else {
                    message.reply("Il n'est pas sur le serveur !");
                }
            } else {
                message.reply("Vous n'avez mentionné personne !");
            }
        } else {
            message.reply("Vous n'avez pas les permissions nécessaires");
        }
    }
}