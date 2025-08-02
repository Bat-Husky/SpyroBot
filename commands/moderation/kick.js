const Discord = require('discord.js')
// const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('../commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Kick extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}kick`)
    }

    static action (message, prefix) {
        const user = message.mentions.users.first();
        if (message.member.permissions.has("KICK_MEMBERS")) {
            if (user) {
                const member = message.guild.members.cache.get(user.id);
                if (member) {
                    let reason_1 = message.content.toString().split(' ');
                    reason_1.shift();
                    reason_1.shift();
                    var reason = reason_1.join(" ");
                    member
                    .kick(reason)
                    .then(() => {
                        message.reply(`J´ai bien expulsé ${user.tag}`, {tts: true});
                    })
                    .catch(err => {
                        message.reply("I can't kick him");
                        console.error(err);
                    });
                } else {
                    message.reply("It's not in the server!");
                }
            } else {
                message.reply("You didn't mention anyone!");
            }
        } else {
            message.reply("You can't use that command!");
        }
    }
}