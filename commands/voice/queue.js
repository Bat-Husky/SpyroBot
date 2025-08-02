module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}queue`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            message.channel.send("There is no song!");
            return
        }
        message.channel.send("Queue :");
        for (const title in serverQueue.songs) {
            message.channel.send("```markdown" + `\n#${serverQueue.songs[title].title}\n` + "```")
        }
    },
}