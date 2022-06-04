const Discord = require('discord.js');

module.exports = class commands {

    /**
     * 
     * @constructor
     * @param {Discord.message} message
     * @param {String} prefix
     * @returns {Boolean}
     */
    static parse(message, prefix) {
        if (this.match(message, prefix)) {
            this.action(message)
            return true
        }
        return false
    }

    static match (_message, _prefix) {
        return false
    }

    static action (_message) {
    }
}