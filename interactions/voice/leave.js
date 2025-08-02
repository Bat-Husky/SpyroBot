const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Quitte le salon vocal')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour quitter.");
        }
		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

		serverQueue.loop = false;
        serverQueue.songs = [];
        serverQueue.connection.destroy();
        queue.delete(interaction.guildId);
		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.addFields([
				{ name: "Left", value: `Le bot a quitté le salon vocal.` }
			]);
		interaction.reply({ embeds: [embed] });
	},
};