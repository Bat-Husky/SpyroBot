module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}resume`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel) {
            message.channel.send(
                "You have to be in a voice channel to unpause the music!"
            );
            return
        }

        if (!serverQueue) {
            message.channel.send("There is no song that I could unpause!");
            return
        }

        serverQueue.player.unpause();
        message.react("▶")
    },
}