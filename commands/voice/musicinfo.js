const { EmbedBuilder } = require("discord.js");

module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}musicinfo`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            message.channel.send("There is no song!");
            return
        }
        var loopValue = serverQueue.loop

        const embed = new EmbedBuilder()
            .setColor("#0042FF")
            .setTitle("Music Info")
            .addFields([
                {name: "Channel vocal :", value: `${serverQueue.voiceChannel}`},
                {name: "Channel Queue :", value: `${serverQueue.textChannel}`},
                {name: "Volume :", value: `${serverQueue.volume*100}%`},
                {name: "Loop :", value: `${loopValue}`}
            ])
        message.channel.send({ embeds: [embed] });
    },
}