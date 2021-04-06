const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
//const ms = require("ms");
//let warns = JSON.parse(fs.readFileSync("../ReBot_test/Warn/Warning.json", "utf8"));



module.exports = class Infractions extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}infractions`)
    }

    static action (message) {
      let warns = JSON.parse(fs.readFileSync("../ReBot_test/JSON/Warning.json", "utf8"));

      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Vous n'avez pas les permissions nécessaires !");
      if(!message.mentions.users.first()) return message.reply("Vous n'avez mentionné personne !")
      let wUser = message.guild.member(message.mentions.users.first()) || message.mentions.users.first().id;
      if(!wUser) return message.reply("Je ne le trouve pas.");

      var warned = message.mentions.users.first();

      if(!warns[wUser.id]) return message.reply("Ce membre n'a pas de warn");

      const warnEmbed = new MessageEmbed()
          .setTitle('Infractions')
          .setColor("#0042ff")
          .addField("User", warned)
          .addField("Number of Warnings", warns[wUser.id].warns)
      message.channel.send(warnEmbed);

    }
}