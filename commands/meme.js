const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');
const kappaImg = new Discord.MessageAttachment('../ReBot_test/Img/Kappa.png')
const lulImg = new Discord.MessageAttachment('../ReBot_test/Img/LUL.png')
const okImg = new Discord.MessageAttachment('../ReBot_test/Img/Saitama-OK.png')
const stonksImg = new Discord.MessageAttachment('../ReBot_test/Img/STONKSe.png')
const dekuImg = new Discord.MessageAttachment('../ReBot_test/Img/Deku.gif')
const leoImg = new Discord.MessageAttachment('../ReBot_test/Img/leonardo.png')



module.exports = class Meme extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}meme`)
    }

    static action (message) {
        var buy = false;
        if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            var nombreAleatoire = Math.floor(Math.random()*6);
            var reponse;
            if (nombreAleatoire == 0) {
                const embed = new MessageEmbed()
                    .setTitle('Kappa')
                    .setColor(0x0042ff)
                    .setURL("https://knowyourmeme.com/memes/kappa")
                    .setImage('attachment://Kappa.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [kappaImg] });
                } else if (nombreAleatoire == 1) {
                    const embed = new MessageEmbed()
                        .setTitle('LUL')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/lul")
                        .setImage('attachment://LUL.png')
                    // message.channel.send(embed);
                    message.channel.send({ embeds: [embed], files: [lulImg] });
                } else if (nombreAleatoire == 2) {
                    const embed = new MessageEmbed()
                        .setTitle('Saitama OK')
                        .setColor(0x0042ff)
                        .setURL("https://knowyourmeme.com/memes/saitama-ok")
                        .setImage('attachment://Saitama-OK.png')
                    // message.channel.send(embed);
                    message.channel.send({ embeds: [embed], files: [okImg] });
                } else if (nombreAleatoire == 3) {
                    const embed = new MessageEmbed()
                        .setTitle('STONKS')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/stonks")
                        .setImage('attachment://STONKSe.png')
                    // message.channel.send(embed);
                    message.channel.send({ embeds: [embed], files: [stonksImg] });
                } else if (nombreAleatoire == 4) {
                    const embed = new MessageEmbed()
                        .setTitle('Dance till your dead Deku')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/photos/1306489-my-hero-academia")
                        .setImage('attachment://Deku.gif')
                    // message.channel.send(embed);
                    message.channel.send({ embeds: [embed], files: [dekuImg] });
                } else {
                    const embed = new MessageEmbed()
                        .setTitle('Leonardo DiCaprio Laughing')
                        .setColor(0xff0000)
                        .setURL("https://knowyourmeme.com/memes/leonardo-dicaprio-laughing")
                        .setImage('attachment://leonardo.png')
                    // message.channel.send(embed);
                    message.channel.send({ embeds: [embed], files: [leoImg] });
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
            var nombreAleatoire = Math.round(Math.random()*6);
            if (nombreAleatoire == 0) {
                const embed = new MessageEmbed()
                    .setTitle('Kappa')
                    .setColor(0x0042ff)
                    .setURL("https://knowyourmeme.com/memes/kappa")
                    .setImage('attachment://Kappa.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [kappaImg] });
            } else if (nombreAleatoire == 1) {
                const embed = new MessageEmbed()
                    .setTitle('LUL')
                    .setColor(0xff0000)
                    .setURL("https://knowyourmeme.com/memes/lul")
                    .setImage('attachment://LUL.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [lulImg] });
            } else if (nombreAleatoire == 2) {
                const embed = new MessageEmbed()
                    .setTitle('Saitama OK')
                    .setColor(0x0042ff)
                    .setURL("https://knowyourmeme.com/memes/saitama-ok")
                    .setImage('attachment://Saitama-OK.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [okImg] });
            } else if (nombreAleatoire == 3) {
                const embed = new MessageEmbed()
                    .setTitle('STONKS')
                    .setColor(0xff0000)
                    .setURL("https://knowyourmeme.com/memes/stonks")
                    .setImage('attachment://STONKSe.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [stonksImg] });
            } else if (nombreAleatoire == 4) {
                const embed = new MessageEmbed()
                    .setTitle('Dance till your dead Deku')
                    .setColor(0xff0000)
                    .setURL("https://knowyourmeme.com/photos/1306489-my-hero-academia")
                    .setImage('attachment://Deku.gif')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [dekuImg] });
            } else {
                const embed = new MessageEmbed()
                    .setTitle('Leonardo DiCaprio Laughing')
                    .setColor(0xff0000)
                    .setURL("https://knowyourmeme.com/memes/leonardo-dicaprio-laughing")
                    .setImage('attachment://leonardo.png')
                // message.channel.send(embed);
                message.channel.send({ embeds: [embed], files: [leoImg] });
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