const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('achievements')
		.setDescription('Affiche les succès d\'un utilisateur')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur dont vous voulez voir les succès')
                .setRequired(false)
            ),
	async execute(interaction) {
        let achiev = JSON.parse(fs.readFileSync("./JSON/cardsystem/achievements.json", "utf8"));

        const tempUser = interaction.options.getUser('utilisateur') || interaction.user;

        const member = await interaction.guild.members.fetch({ user: tempUser.id, force: true });

        const user = member.user;

        const color = user.accentColor;

        if (!achiev[user.id]) {
            await interaction.reply({ content: "Aucun succès trouvé pour cet utilisateur.", flags: MessageFlags.Ephemeral });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle("Succès de l'utilisateur")
            .setColor(color || "#0099ff");

        for (const element of achiev[user.id]) {
            embed.addFields({ name: element.name, value: "Date : " + element.date });
        }

        await interaction.reply({ embeds: [embed] });
	},
};