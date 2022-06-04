const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');
const fs = require('fs');
const xpImg = new Discord.MessageAttachment('../ReBot_test/Img/XP.png')
const stoImg = new Discord.MessageAttachment('../ReBot_test/Img/STONKS.jpg')

module.exports = class GiveXP extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}givexp`)
    }

    static action (message) {
        // let cheating = JSON.parse(fs.readFileSync("../SpyroBot_new/JSON/tricheur.json", "utf8"));
        // let User = message.member;

        // if(!cheating[User.id]) cheating[User.id] = {
        //    cheating: 0
        // };

        // cheating[User.id].cheating++;

        // fs.writeFile("../SpyroBot_new/JSON/tricheur.json", JSON.stringify(cheating), (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // });

        const embed = new MessageEmbed()
              .setColor("#ff0000")
              .setTitle("Give Experience")
              .setURL("https://www.youtube.com/watch?v=_jMFke5W1oA")
              .setDescription("Choisissez le montant d'xp")
              .setFooter("Sponsorisé par STONKS !", "attachment://STONKS.jpg")
              .setThumbnail('attachment://XP.png')
              .addFields(
                { name: '1000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '2000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '5000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '10000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '20000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '50000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '100000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '200000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
                { name: '500000', value: "[Cliquez ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true }
              )
        //   message.channel.send(embed);
          message.channel.send({ embeds: [embed], files: [xpImg, stoImg] });
    }
}