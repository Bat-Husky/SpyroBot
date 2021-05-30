const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');
const kappaImg = new Discord.MessageAttachment('../ReBot_test/Img/Kappa.png')
const lulImg = new Discord.MessageAttachment('../ReBot_test/Img/LUL.png')
const okImg = new Discord.MessageAttachment('../ReBot_test/Img/Saitama-OK.png')
const stonksImg = new Discord.MessageAttachment('../ReBot_test/Img/STONKSe.png')

module.exports = class Meme extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}meme`)
    }

    static action (message) {
        var buy = false;
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
            let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
            if (talkedRecently.has(message.author.id)) {
                if (message.content.toString().toLowerCase().split(' ')[1] != "buy" || coins[message.author.id].coins < 100) {
                    return message.channel.send("Wait a minute before trying again " + message.author.toString());
                }

                coins[message.author.id].coins -= 100;
                buy = true;

                fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            var nombreAleatoire = Math.round(Math.random()*4);
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
            if (buy == false) {
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                    talkedRecently.delete(message.author.id);
                }, 60000);
            }
        }
    }
}