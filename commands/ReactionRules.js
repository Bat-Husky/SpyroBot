module.exports = {
    async execute(message, Discord, bot) {
        const channel = '683395478913679580';

        const emoji = '🛑';

        let embed = new Discord.MessageEmbed()
            .setColor('#0042ff')
            .setTitle('Accepter le règlement')
            .setDescription('Acceptez le règlement pour avoir accès au reste du serveur ! \nAmusez-vous !')
            .setFooter('Sous réserve de changements')
            .setAuthor("Bat Husky", message.guild.members.cache.get(message.guild.ownerId).user.avatarURL("png"))

        // let messageEmbed = await message.channel.send(embed);
        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(emoji);
    }

}