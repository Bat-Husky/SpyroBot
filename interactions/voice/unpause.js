const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Reprend la musique en cours de lecture'), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour reprendre la musique !");
        }

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

        serverQueue.player.unpause();

		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.setTitle("Musique reprise")
			.setDescription("La musique en cours de lecture a été reprise.");

		interaction.reply({ embeds: [embed] });
	},
};