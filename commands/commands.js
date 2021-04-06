const Discord = require('discord.js')
const bot = new Discord.Client()

module.exports = class commands {

    static parse (message, prefix) {
        if (this.match(message, prefix)) {
            this.action(message)
            return true
        }
        return false
    }

    static match (message) {
        return false
    }

    static action (message) {
    }
}