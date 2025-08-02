module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}pause`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel) {
            message.channel.send(
                "You have to be in a voice channel to pause the music!"
            );
            return
        }

        if (!serverQueue) {
            message.channel.send("There is no song that I could pause!");
            return
        }

        serverQueue.player.pause();
        message.react("⏸")
    },
}