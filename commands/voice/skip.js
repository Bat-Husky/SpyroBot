const { PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}skip`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            let coins = JSON.parse(fs.readFileSync("./JSON/coin.json", "utf8"));
            if (coins[message.author.id].coins < 200) {message.reply(`You don't have enough coins to skip! \n\`${coins[message.author.id].coins}\` < \`200\``); return}
            coins[message.author.id].coins -= 200;
            fs.writeFile("./JSON/coin.json", JSON.stringify(coins), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        if (!message.member.voice.channel) {
            message.channel.send(
                "You have to be in a voice channel to skip the music!"
            );
            return
        }
        if (!serverQueue) {
            message.channel.send("There is no song that I could skip!");
            return
        }
        serverQueue.player.stop();
        message.react("⏭")
    },
}