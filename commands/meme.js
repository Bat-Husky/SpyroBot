const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const kappaImg = new Discord.MessageAttachment('../ReBot_test/Img/Kappa.png')
const lulImg = new Discord.MessageAttachment('../ReBot_test/Img/LUL.png')
const okImg = new Discord.MessageAttachment('../ReBot_test/Img/Saitama-OK.png')
const stonksImg = new Discord.MessageAttachment('../ReBot_test/Img/STONKSe.png')

module.exports = class Meme extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}meme`)
    }

    static action (message) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            var nombreAleatoire = Math.round(Math.random()*4);
            var reponse;
            if (nombreAleatoire == 1) {
                const embed = new MessageEmbed()
                    .setTitle('Kappa')
                    .setColor(0x0042ff)
                    .setURL("https://knowyourmeme.com/memes/kappa")
                    .attachFiles(kappaImg)
                    .setImage('attachment://Kappa.png')
                message.channel.send(embed);
                } else if (nombreAleatoire == 2) {
                    const embed = new MessageEmbed()
                        .setTitle('LUL')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/lul")
                        .attachFiles(lulImg)
                        .setImage('attachment://LUL.png')
                    message.channel.send(embed);
                } else if (nombreAleatoire == 3) {
                    const embed = new MessageEmbed()
                        .setTitle('Saitama OK')
                        .setColor(0x0042ff)
                        .setURL("https://knowyourmeme.com/memes/saitama-ok")
                        .attachFiles(okImg)
                        .setImage('attachment://Saitama-OK.png')
                    message.channel.send(embed);
                } else {
                    const embed = new MessageEmbed()
                        .setTitle('STONKS')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/stonks")
                        .attachFiles(stonksImg)
                        .setImage('attachment://STONKSe.png')
                    message.channel.send(embed);
                }
        } else {
            if (talkedRecently.has(message.author.id)) {
                message.channel.send("Attendez une minute avant de réessayer" + message.author.toString());
            } else {
                var nombreAleatoire = Math.round(Math.random()*4);
                var reponse;
                if(nombreAleatoire == 1){
                    const embed = new MessageEmbed()
                        .setTitle('Kappa')
                        .setColor(0x0042ff)
                        .setURL("https://knowyourmeme.com/memes/kappa")
                        .attachFiles(kappaImg)
                        .setImage('attachment://Kappa.png')
                    message.channel.send(embed);
                } else if (nombreAleatoire == 2) {
                    const embed = new MessageEmbed()
                        .setTitle('LUL')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/lul")
                        .attachFiles(lulImg)
                        .setImage('attachment://LUL.png')
                    message.channel.send(embed);
                } else if (nombreAleatoire == 3) {
                    const embed = new MessageEmbed()
                        .setTitle('Saitama OK')
                        .setColor(0x0042ff)
                        .setURL("https://knowyourmeme.com/memes/saitama-ok")
                        .attachFiles(okImg)
                        .setImage('attachment://Saitama-OK.png')
                    message.channel.send(embed);
                } else {
                    const embed = new MessageEmbed()
                        .setTitle('STONKS')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/stonks")
                        .attachFiles(stonksImg)
                        .setImage('attachment://STONKSe.png')
                    message.channel.send(embed);
                }
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    talkedRecently.delete(message.author.id);
                }, 60000);
            }
        }
    }
}