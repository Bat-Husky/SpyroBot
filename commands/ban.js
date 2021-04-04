const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Ban extends commands {

    static match (message) {
        return message.content.toString().toLowerCase().startsWith('r/ban')
    }

    static action (message) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
          const user = message.mentions.users.first();
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              member
                .ban({
                  reason: "C'EST PAS GENTIL D'ÊTRE MÉCHANT",
                })
                .then(() => {
                  message.reply(`J´ai bien banni ${user.tag}`, {tts: true});
                })
                .catch(err => {
                  message.reply('Je ne peux pas le bannir');
                  console.error(err);
                });
            } else {
              message.reply("Il n'est pas sur le serveur !");
            }
          } else {
            message.reply("Vous n'avez mentionné personne !");
          }
          }else {
               message.reply("Vous n'avez pas les permissions nécessaires");
          }
    }
}