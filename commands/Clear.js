const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Clear extends commands {

     static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}clear`)
    }

    static async action (message) {
        if (!message.member.permissions.has('MANAGE_MESSAGES'))
            return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
        if (!isNaN(message.content.split(' ')[1])) {
            let amount = 0;
            if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
                amount = 2;
            } else {
                amount = Number(message.content.split(' ')[1]) + 1;
                if (amount > 100) {
                    amount = 100;
                }
            }
            await message.channel.bulkDelete(amount, true).then((_message) => {
                message.channel.send(`Bot cleared \`${_message.size - 1}\` messages :broom:`).then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 2500);
                });
            });
        } else {
            message.channel.send('Enter the amount of messages that you would like to clear').then((sent) => {
                setTimeout(function () {
                    sent.delete();
                }, 2500);
            });
        }
    }
}