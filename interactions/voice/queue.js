const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Affiche la liste des chansons dans la file d\'attente')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.setTitle("Liste des chansons dans la file d'attente")
			.setDescription("Voici les chansons en attente :");

		serverQueue.songs.forEach((song, index) => {
			embed.addFields({ name: `#${index + 1}`, value: `[${song.title}](${song.url})` });
		});

		interaction.reply({ embeds: [embed] });
	},
};