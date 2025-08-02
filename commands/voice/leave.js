module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}leave`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel) {
            message.channel.send(
                "You have to be in a voice channel to stop the music!"
            );
            return
        }

        if (!serverQueue) {
            message.channel.send("There is no song that I could stop!");
            return
        }

        serverQueue.loop = false;
        serverQueue.songs = [];
        serverQueue.connection.destroy();
        queue.delete(message.guild.id);
        message.react("🛑")
    },
}