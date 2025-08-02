const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Met une avertissement à un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à avertir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison de l\'avertissement')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
            let warns = JSON.parse(fs.readFileSync("./JSON/Warning.json", "utf8"));
    
            if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return interaction.reply("You can't use that command!");
    
            let logsChannels = JSON.parse(fs.readFileSync("./JSON/LogsChannels.json", "utf8"));
    
            if (!logsChannels[interaction.guildId] || !interaction.guild.channels.cache.find(ch => ch.name == logsChannels[interaction.guildId]) && !interaction.guild.channels.cache.find(ch => ch.id == logsChannels[interaction.guildId])) {
                return interaction.reply("Définnissez le channel des logs comme ceci : \n`$LogsChannel <id or name>`")
            }
    
            var warned = interaction.options.getUser('user');
            var wUser = interaction.guild.members.cache.get(warned.id);
            
            if (!wUser) return await interaction.reply("Can't find user!");
            if (wUser.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply("I can't warn him!");
    
    
            var reason = interaction.options.getString('reason');
    
            if (!reason) return await interaction.reply("There is no reason!");
    
            if (!warns[wUser.id]) warns[wUser.id] = {
                warns: 0
            };
    
            warns[wUser.id].warns++;
    
            fs.writeFile("./JSON/Warning.json", JSON.stringify(warns), (err) => {
                if (err) {
                    console.log(err);
                }
            });
    
            const warnEmbed = new EmbedBuilder()
                .setDescription("Warns")
                .setAuthor({ name: `From ${interaction.member.nickname}`, iconURL: interaction.user.displayAvatarURL() })
                .setColor("#0042ff")
                .addFields([
                    { name: 'Warned User', value: wUser.nickname, inline: false },
                    { name: 'Reason', value: reason, inline: false }
                ])
                .setFooter({ text: `Number of Warnings: ${warns[wUser.id].warns}`, iconURL: warned.displayAvatarURL() })
            await interaction.reply({ embeds: [warnEmbed] });
    
            
            const warnChannel = interaction.guild.channels.cache.find(ch => ch.name == logsChannels[interaction.guildId]) || interaction.guild.channels.cache.find(ch => ch.id == logsChannels[interaction.guildId])
    
            const warnEmbedLogs = new EmbedBuilder()
                .setDescription("Warns")
                .setAuthor({ name: `From ${interaction.member.nickname}`, iconURL: interaction.user.displayAvatarURL() })
                .setColor("#0042ff")
                .addFields([
                { name: 'Warned User', value: wUser.nickname, inline: false },
                { name: 'Warned in', value: interaction.channel.name, inline: false },
                { name: 'Number of Warnings', value: warns[wUser.id].warns.toString(), inline: false },
                { name: 'Reason', value: reason, inline: false }
                ])
            warnChannel.send({ embeds: [warnEmbedLogs] });
	},
};