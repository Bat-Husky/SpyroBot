const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()
const fs = require('fs');


module.exports = class Baka extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}baka`)
    }

    static action (message) {
        let status = JSON.parse(fs.readFileSync("./JSON/CommandStatus.json", "utf8"));
        var buy = false;

        if (status["baka"][message.guild.id] == "off") return;

        if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.members.cache.get(user.id);
                if (member) {
                    var nombreAleatoire = Math.round(Math.random()*8);
                    var reponse;
                    if(nombreAleatoire === 1) {
                        message.channel.send({content: `${user} est une grosse merde`, tts: true})
                    } else if (nombreAleatoire === 2) {
                        message.channel.send({content: `${user} va bouffer ses grands morts`, tts: true})
                    } else if (nombreAleatoire === 3) {
                        message.channel.send({content: `${user} est juste un énorme ABRUTI`, tts: true})
                    } else if (nombreAleatoire === 4) {
                        message.channel.send({content: `${user} est une PÉTASSE`, tts: true})
                    } else if (nombreAleatoire === 5) {
                        message.channel.send({content: `${user} est un sale gueux`, tts: true})
                    } else if (nombreAleatoire === 6) {
                        message.channel.send({content: `${user} a un balai dans l'cul`,tts: true})
                    } else if (nombreAleatoire === 7) {
                        message.channel.send({content: `${user} est une ordure`, tts: true})
                    } else {
                        message.channel.send({content: `${user} est un sale gougnafier`, tts: true})
                    }
                } else {
                    message.reply("Il n'est pas sur le serveur !");
                }
            } else {
                message.reply("Vous n'avez mentionné personne !");
            }
        } else {
            let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
            if (talkedRecently.has(message.author.id)) {
                if (message.content.toString().toLowerCase().split(' ')[2] != "buy" || coins[message.author.id].coins < 100) {
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
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.members.cache.get(user.id);
                if (member) {
                    var nombreAleatoire = Math.round(Math.random()*8);
                    var reponse;
                    if (nombreAleatoire === 1) {
                        message.channel.send(`${user} est une grosse merde`)
                    } else if (nombreAleatoire === 2) {
                        message.channel.send(`${user} va bouffer ses grands morts`)
                    } else if (nombreAleatoire === 3) {
                        message.channel.send(`${user} est juste un énorme ABRUTI`)
                    } else if (nombreAleatoire === 4) {
                        message.channel.send(`${user} est une PÉTASSE`)
                    } else if (nombreAleatoire === 5) {
                        message.channel.send(`${user} est un sale gueux`)
                    } else if (nombreAleatoire === 6) {
                        message.channel.send(`${user} a un balai dans l'cul`)
                    } else if (nombreAleatoire === 7) {
                        message.channel.send(`${user} est une ordure`)
                    } else {
                        message.channel.send(`${user} est un sale gougnafier`)
                    }
                    if (buy == false) {
                        talkedRecently.add(message.author.id);
                        setTimeout(() => {
                            talkedRecently.delete(message.author.id);
                        }, 60000);
                    }
                } else {
                    message.reply("Il n'est pas sur le serveur !");
                }
            } else {
                message.reply("Vous n'avez mentionné personne !");
            }
        }
    }
}