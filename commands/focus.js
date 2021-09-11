const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

const allFocus = new Map()

module.exports = class focus extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}focus`)
    }

    static action (message) {
        if (message.content.toString().toLowerCase().split(' ')[1] == "debug") return this.debug(message, message.content.toString().toLowerCase().split(' ')[2])

        let tempFocus = message.content.toString().split(' ');
        tempFocus.splice(0, 2)
        let FocusSet = tempFocus.join(' ');
    
        if (message.content.toString().toLowerCase().split(' ')[1] == "set" || message.content.toString().toLowerCase().split(' ')[1] == "set_unbreakable") {
            if (!message.content.toString().toLowerCase().split(' ')[2]) return message.reply("No focus!")
            let unbreakable = "none";
            if (message.content.toString().toLowerCase().split(' ')[1] == "set_unbreakable") unbreakable = "true"
            return this.set(message, message.author, FocusSet, unbreakable)
        }

        if (message.content.toString().toLowerCase().split(' ')[1] == "delete") return this.delete(message, message.author, false);
        if (message.content.toString().toLowerCase().split(' ')[1] == "actual") return this.actual(message, message.author);

        //message.channel.send("__**Focus Options :**__ \n>>> Mettre un focus : `$focus set <focus>` \nMettre un focus + mode indésactivable : `$focus set_unbreakable <focus>` \nDésactiver le focus : `$focus delete` \nDebug : `$focus debug`")
        message.channel.send("__**Focus Options :**__ \n>>> Mettre un focus : `$focus set <focus>` \nVoir son Focus : `$focus actual` \nDésactiver le focus : `$focus delete` \nDebug : `$focus debug`")
    }

    static debug (message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You can't use that command!")
        if (args == "force" || args == "force_unbreakable") {
            if (!message.mentions.users.first()) return message.reply("Can't find user!")
            if (!message.content.toString().toLowerCase().split(' ')[4]) return message.reply("No focus!")
            let tempFocus = message.content.toString().split(' ');
            tempFocus.splice(0, 4)
            let FocusSet = tempFocus.join(' ');
            let isUnbreakable = "none";
            if (args == "force_unbreakable") isUnbreakable = "admin"
            return this.set(message, message.mentions.users.first(), FocusSet, isUnbreakable)
        }

        if (args == "delete") {
            if (!message.mentions.users.first()) return message.reply("Can't find user!")
            return this.delete(message, message.mentions.users.first(), true)
        }

        if (args == "actual") {
            if (!message.mentions.users.first()) return message.reply("Can't find user!")
            return this.actual(message, message.mentions.users.first())
        }

        message.channel.send("__**Focus Debug Mode :**__ \n>>> Forcer le focus : `$focus debug force <user> <focus>` \nForcer le focus + mode indésactivable : `$focus debug force_unbreakable <user> <focus>` \nDésactiver un focus : `$focus debug delete <user>`")
    }

    static set (message, user, FocusSet, unbreak) {
        let focusInfo = {
            user: user,
            focus: FocusSet,
            status: unbreak
        }

        allFocus.set(user.id, focusInfo);

        message.channel.send(`Focus défini sur \`${focusInfo.focus}\``)
    }

    static delete (message, user, isAdmin) {
        if (!allFocus.get(user.id)) return message.reply("Il n'y a pas de focus !")
        
        let focusInfo = allFocus.get(user.id);

        if (focusInfo.status == "admin" && isAdmin == false) return message.reply("You can't delete this focus!")

        allFocus.delete(user.id);

        message.channel.send("Le focus a bien été supprimé !")
    }

    static actual (message, user) {
        if (!allFocus.get(user.id)) return message.reply("Il n'y a pas de focus !");

        let focusInfo = allFocus.get(user.id);

        message.reply(`Le focus est défini sur \`${focusInfo.focus}\``)
    }
}