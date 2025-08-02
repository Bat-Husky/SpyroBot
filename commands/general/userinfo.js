const commands = require('../commands');
const { Client, EmbedBuilder } = require('discord.js');


const userInfos = new Map();

module.exports = class UserInfo extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}userinfo`)
    }

    // TODO : enlever la Map et rajouter une date comprehensible

    static action (message) {
        const user = message.mentions.users.first()
        const member = message.mentions.members.first()
        if (!user) return message.reply("Vous n'avez mentionnez personne !")
        if (!userInfos.get(user.id)) {
            const userInfo = {
                ID: user.id,
                Username: user.username,
                Avatar: user.avatarURL("png"),
                Presence: user.presence.status
            }

            userInfos.set(user.id, userInfo)
        }

        let Info = userInfos.get(user.id)
        const embed = new EmbedBuilder()
            .setTitle(Info.Username)
            .addFields([
                { name: "ID :", value: `${Info.ID}` },
                { name: "Presence :", value: `**${Info.Presence}** et ${member.joinedAt}` }
            ])
            .setThumbnail(Info.Avatar)
        message.channel.send({ embeds: [embed] });
    }
}