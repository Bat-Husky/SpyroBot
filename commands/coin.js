const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
const hourCoin = new Set();

module.exports = class Coin extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}coin`)
    }

    static action (message) {
        if (!message.content.toString().toLowerCase().split(' ')[1]) return message.reply("Utilisez `$coin info` pour plus d'informations.")
        if (message.content.toString().toLowerCase().split(' ')[1] == "info") return this.info(message);

        let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));

        if (message.content.toString().toLowerCase().split(' ')[1] == "get") return this.get(message, coins);
        if (message.content.toString().toLowerCase().split(' ')[1] == "amount") return this.number(message, coins);
    }

    static info (message) {

    }

    static get (message, coins) {
        if (hourCoin.has(message.author.id)) return message.reply("The `$coin get` is limited to once per hour.");

        if(!coins[message.author.id]) coins[message.author.id] = {
            coins: 0
        };

        coins[message.author.id].coins += 250;

        message.reply("`250 coins` have been added to your wallet")

        fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
            if (err) {
                console.log(err);
            }
        });

        hourCoin.add(message.author.id);
        setTimeout(() => {
            hourCoin.delete(message.author.id);
        }, 3600000);
    }

    static number (message, coins) {
        var cUser = message.mentions.users.first();

        if (!cUser) cUser = message.author;

        if(!coins[cUser.id]) return message.reply("This user has no coin!");

        const warnEmbed = new MessageEmbed()
            .setTitle('Coins')
            .setColor("#0042ff")
            .addField("User", cUser)
            .addField("Number of Coins", coins[cUser.id].coins)
        message.channel.send(warnEmbed);
    }
}