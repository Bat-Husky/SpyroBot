const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = class MalFoutu extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}tonbotestmalfoutu`)
    }

    static action (message) {
        let status = JSON.parse(fs.readFileSync("./JSON/CommandStatus.json", "utf8"));
        let malfoutu = JSON.parse(fs.readFileSync("./JSON/malfoutu.json", "utf8"));

        if (status["malfoutu"][message.guild.id] == "off") return;

        if (message.content.toString().toLowerCase().split(' ')[1] == "set") return this.set(message, malfoutu);
        
        if (malfoutu[message.author.id]) return message.channel.send(`${malfoutu[message.author.id]}`, {tts: true})
        message.channel.send('Tu te calme martine ! Tu crois ça facile de coder un bot ?', {tts: true})
    }

    static set (message, malfoutu) {
        let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
        if (coins[message.author.id].coins < 750) return message.reply(`You don't have enough coins to change your text of \`$tonbotestmalfoutu\`! \n\`${coins[message.author.id].coins}\` < \`750\``)

        if (!message.content.toString().toLowerCase().split(' ')[2]) return message.reply("Vous n'avez pas mis de phrase.")

        let newPhrase = message.content.toString().split(' ')
        newPhrase.splice(0, 2)
        newPhrase = newPhrase.join(' ')

        malfoutu[message.author.id] = newPhrase;

        fs.writeFile("./JSON/malfoutu.json", JSON.stringify(malfoutu), (err) => {
            if (err) {
                console.log(err);
            }
        });

        message.channel.send(`$Tonbotestmalfoutu now set to : \n\`${newPhrase}\``)
    }
}