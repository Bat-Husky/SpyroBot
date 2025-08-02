const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Permet de régler le volume de la musique en cours de lecture.')
        .addIntegerOption(option =>
            option.setName('niveau')
                .setDescription('Niveau de volume en pourcentage')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // No permissions required
	async execute(interaction, queue, bot) {
		const serverQueue = queue.get(interaction.guildId);

        if (!interaction.member.voice.channel) {
            return interaction.reply("Vous devez être dans un salon vocal pour reprendre la musique !");
        }

		if (!serverQueue) return interaction.reply("Il n'y a pas de musique en cours de lecture.");

        const vol = interaction.options.getInteger('niveau')/100 || serverQueue.volume;
        serverQueue.ressource.volume.setVolume(vol);
        serverQueue.volume = vol;

		const embed = new EmbedBuilder()
			.setColor("#0042ff")
			.setTitle("Réglage du volume")
			.addFields([{ name: "Volume actuel :", value: `${serverQueue.volume * 100}%` }])

		interaction.reply({ embeds: [embed] });
	},
};  