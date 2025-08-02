const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Donne le niveau et le rang d\'un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur dont vous voulez voir le rang')
                .setRequired(false)
        ),
	async execute(interaction) {
		let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));
        
        var User = interaction.member;
    
        if (interaction.options.getUser('user')) {
            User = interaction.guild.members.cache.get(interaction.options.getUser('user').id);
        }
    
        var rank = 1;
    
        const Level = allLevels["User"][User.id]["level"]
    
        if (!allLevels["User"][User.id]) {
            return interaction.editReply("Cette personne n'a pas de niveau.")
        }
    
        for (var i = 0; i < allLevels["List"].length; i++) {
            //console.log(allLevels["User"]["467284102987382800"])
            if (allLevels["User"][allLevels["List"][i]]["id"] == User.id) {
                rank = rank
            } else if (allLevels["User"][allLevels["List"][i]]["level"] > Level) {
                rank += 1
            } else if (allLevels["User"][allLevels["List"][i]]["level"] == Level) {
                if (allLevels["User"][allLevels["List"][i]]["xp"] > allLevels["User"][User.id]["xp"]) {
                    rank += 1
                }
            }
        }
    
        const embed = new EmbedBuilder()
            .setColor("#0042ff")
            .setTitle(`${User.nickname}`)
            .addFields([
                { name: "Rank :", value: `${rank}` },
                { name: "Level :", value: `${allLevels["User"][User.id]["level"]}` },
                { name: "XP :", value: `${allLevels["User"][User.id]["xp"]} / ${allLevels["User"][User.id]["xpLevel"]}` }
            ])
            .setThumbnail(User.user.avatarURL("png"))
    
        await interaction.reply({ embeds: [embed] })
	},
};