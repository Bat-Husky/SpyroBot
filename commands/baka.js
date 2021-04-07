const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const talkedRecently = new Set()

module.exports = class Baka extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}baka`)
    }

    static action (message) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    var nombreAleatoire = Math.round(Math.random()*8);
                    var reponse;
                    if(nombreAleatoire === 1) {
                        message.channel.send(`${user} est une grosse merde`, {tts: true})
                    } else if (nombreAleatoire === 2) {
                        message.channel.send(`${user} va bouffer ses grands morts`, {tts: true})
                    } else if (nombreAleatoire === 3) {
                        message.channel.send(`${user} est juste un énorme ABRUTI`, {tts: true})
                    } else if (nombreAleatoire === 4) {
                        message.channel.send(`${user} est une PÉTASSE`, {tts: true})
                    } else if (nombreAleatoire === 5) {
                        message.channel.send(`${user} est un sale gueux`, {tts: true})
                    } else if (nombreAleatoire === 6) {
                        message.channel.send(`${user} a un balai dans l'cul`, {tts: true})
                    } else if (nombreAleatoire === 7) {
                        message.channel.send(`${user} est une ordure`, {tts: true})
                    } else {
                        message.channel.send(`${user} est un sale gougnafier`, {tts: true})
                    }
                } else {
                    message.reply("Il n'est pas sur le serveur !");
                }
            } else {
                message.reply("Vous n'avez mentionné personne !");
            }
        } else {
            if (talkedRecently.has(message.author.id)) {
                message.channel.send("Attendez une minute avant de réessayer" + message.author.toString());
            } else {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
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
                        talkedRecently.add(message.author.id);
                        setTimeout(() => {
                            talkedRecently.delete(message.author.id);
                        }, 60000);
                    } else {
                        message.reply("Il n'est pas sur le serveur !");
                    }
                } else {
                    message.reply("Vous n'avez mentionné personne !");
                }
            }
        }
    }
}