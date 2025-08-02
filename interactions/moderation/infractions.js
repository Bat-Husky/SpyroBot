const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('infractions')
		.setDescription('Montre les infractions d\'un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur dont vous voulez voir les infractions')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
		let warns = JSON.parse(fs.readFileSync("./JSON/Warning.json", "utf8"));
        const user = interaction.member;

        const member = interaction.options.getUser('user');
        // const member = guild.members.cache.find(member => member.id == mention.value);
            
        if(!warns[member.id]) {
            return interaction.editReply("Cet utilisateur n'a pas d'infractions !");
        }

        const warnEmbed = new EmbedBuilder()
            .setTitle('Infractions')
            .setColor("#0042ff")
            .addFields([
                { name: "User", value: member.username },
                { name: "Number of Warnings", value: warns[member.id].warns.toString() }
            ])
            
        await interaction.reply({ embeds: [warnEmbed] })
	},
};