const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class openPattern {

    static parse (message, prefix) {
        if (this.match(message, prefix)) {
            this.action(message, prefix)
            return true
        }
        return false
    }

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}open`)
    }

    static action (message, prefix) {
        if (message.content.toString().toLowerCase().startsWith(`${prefix}openpattern`)) return this.pattern(message);
        if (message.content.toString().toLowerCase().startsWith(`${prefix}openinfo`)) return this.info(message);
        if (message.content.toString().toLowerCase().startsWith(`${prefix}opencode`)) return this.code(message);
    }

    static pattern (message) {
        const embed = new MessageEmbed()
            .setTitle("OpenBot")
            .setColor("#53E2AB")
            .setDescription("Voici le pattern de programmation de commande pour OpenBot en TypeScript : \n\n\n```ts\nimport {\n    Command,\n    CommandMessage\n} from \"@typeit/discord\"\nimport { MessageEmbed } from \"discord.js\";\n\nexport abstract class Pattern {\n    @Command(\"nom de la commande\")\n    async Pattern(message: CommandMessage) {\n      // insérer code ici.\n    }\n}\n```")
            .setThumbnail("https://bat-husky.github.io/OpenBotus.png")
        message.channel.send(embed)
        // message.channel.send({ embeds: [embed] });
        // TODO : v13
    }

    static info (message) {
        message.channel.send("OpenBot est un Bot qui a été conçu dans le but d'être fait par les autres, à la base, il ne possède que 2 ou 3 commandes, les autres devant être codées par la communauté. \nFaites `$OpenPattern` pour voir la base du code et complétez là pour faire vos propres commandes.")
    }

    static code (message) {
        const embed = new MessageEmbed()
            .setTitle("OpenBot")
            .setColor("#53E2AB")
            .setDescription("Voici un de exemple de ce à quoi ressemblerait une commande `echo` : \n\n\n```ts\nimport {\n    Command,\n    CommandMessage\n} from \"@typeit/discord\"\nimport { MessageEmbed } from \"discord.js\";\n\nexport abstract class Pattern {\n    @Command(\"echo\")\n    async echo(message: CommandMessage) {\n      let echo = message.content.toString().split(\" \");\n      echo.shift()\n      let echo2 = echo.join(' ')\n      message.reply(`${echo2}`)\n    }\n}\n```")
        message.channel.send(embed)
    }
}