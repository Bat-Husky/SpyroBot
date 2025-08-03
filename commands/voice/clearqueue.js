const { PermissionFlagsBits } = require('discord.js');

module.exports =  {
    match(message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}clearqueue`)
    },
    async action(message, queue, bot) {
        let serverQueue = queue.get(message.guild.id);
        
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return message.reply("Vous devez être administrateur pour utiliser cette commande.");
        }

        if (!message.member.voice.channel) {
            message.channel.send(
                "Vous devez être dans un salon vocal pour quitter."
            );
            return
        }
        if (!serverQueue) {
            message.channel.send("Il n'y a pas de musique en cours de lecture.");
            return
        }
        
		serverQueue.songs = [serverQueue.songs[0]]; // Keep only the currently playing song
        message.channel.send("La file d'attente a été nettoyée avec succès !");
    },
}