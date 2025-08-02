const { EmbedBuilder } = require('discord.js');

module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}volume`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel) {
            message.channel.send(
                "You have to be in a voice channel to change the volume !"
            );
            return
        }
        if (!serverQueue) { message.channel.send("There is no song !"); return }

        let vol = Number(message.content.toString().toLowerCase().split(' ')[1]);

        const vembed = new EmbedBuilder()
            .setColor("#0042ff")
            .addFields([{ name: "Current volume :", value: `${Number(serverQueue.volume) * 100}%` }])
        if (!vol) { message.channel.send({ embeds: [vembed] }); return }

        serverQueue.ressource.volume.setVolume(vol);
        serverQueue.volume = vol;

        const embed = new EmbedBuilder()
            .setColor("#0042ff")
            .addFields([{ name: "Set volume to", value: `${vol * 100}%` }])

        message.channel.send({ embeds: [embed] });
    },
}