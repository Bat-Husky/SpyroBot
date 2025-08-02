const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Signaler un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à signaler')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison du signalement')
                .setRequired(true)),
	async execute(interaction) {
            let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));
    
            if (!logsChannels[interaction.guildId] || !interaction.guild.channels.cache.find(ch => ch.name == logsChannels[interaction.guildId]) && !interaction.guild.channels.cache.find(ch => ch.id == logsChannels[interaction.guildId])) {
                return interaction.reply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
            }
    
            if (interaction.guild.ownerId == interaction.options.getUser('user').id) return interaction.reply("Vous ne pouvez pas le report");
            
            const reportChannel = interaction.guild.channels.cache.find(ch => ch.name == logsChannels[interaction.guildId]) || interaction.guild.channels.cache.find(ch => ch.id == logsChannels[interaction.guildId])
    
            let reason = interaction.options.getString('reason');
            if (!reason) return interaction.reply("Il n'y a pas de raison !");
    
            if (!interaction.options.getUser('user')) return interaction.reply("Vous n'avez mentionné personne !")

            let member = interaction.guild.members.cache.get(interaction.options.getUser('user').id);
    
            interaction.reply(`${member} a bien été signalé.`)
    
            const embed = new EmbedBuilder()
                .setTitle("Report")
                .addFields([
                    { name: "By", value: `${interaction.member}` },
                    { name: "Report User", value: `${member}` },
                    { name: "Reason", value: `${reason}` }
                ])
            reportChannel.send({ embeds: [embed] });
	},
};