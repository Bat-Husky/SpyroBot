const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Passe à la chanson suivante')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);
        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour passer la musique !");
        }
		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

		serverQueue.player.stop();
		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.addFields([
				{ name: "Skipped", value: `La chanson a été passée.` }
			]);
		interaction.reply({ embeds: [embed] });
	},
};