const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Affiche la liste des chansons dans la file d\'attente')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

        let len = serverQueue.songs.length;
        const pages = Math.ceil(len / 10);
        if (pages > 1) len = 10;

		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.setTitle("Liste des chansons dans la file d'attente")
			.setDescription("Voici les chansons en attente :")
			.setFooter({ text: `Page 1/${pages}` });

		for (let i = 0; i < len; i++) {
			const song = serverQueue.songs[i];
			embed.addFields({ name: `#${i + 1} : ${song.member.nickname}`, value: `[${song.title}](${song.url})` });
		}

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('prevQueue')
					.setEmoji('⬅️')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId('nextQueue')
					.setEmoji('➡️')
					.setStyle(ButtonStyle.Primary)
					.setDisabled(pages <= 1)
			);

		interaction.reply({ embeds: [embed], components: [row] });
	},
};
