const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearqueue')
		.setDescription('Supprime toutes les chansons de la file d\'attente')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour quitter.");
        }
		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

		serverQueue.songs = [serverQueue.songs[0]]; // Keep only the currently playing song
		interaction.reply("La file d'attente a été nettoyée avec succès !");
	},
};