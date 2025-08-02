const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Met en pause la musique en cours de lecture'),
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour mettre la musique en pause !");
        }

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");
		
        serverQueue.player.pause();

		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.setTitle("Musique en pause")
			.setDescription("La musique en cours de lecture a été mise en pause.");

		interaction.reply({ embeds: [embed] });
	},
};