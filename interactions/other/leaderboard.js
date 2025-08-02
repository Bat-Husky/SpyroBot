const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Affiche le classement des utilisateurs'),
	async execute(interaction) {
        let allLevels = JSON.parse(fs.readFileSync("./JSON/Levels.json", "utf8"));

        var sortedId = allLevels["List"].sort((a, b) => allLevels["User"][b]["level"] - allLevels["User"][a]["level"])

        var top10 = sortedId.slice(0, 10)
        

        var ranks = {};
        
        for (const id of top10) {
            const Level = allLevels["User"][id]["level"]
            let rank = 1
            for (var i = 0; i < allLevels["List"].length; i++) {
                //console.log(allLevels["User"]["467284102987382800"])
                if (allLevels["User"][allLevels["List"][i]]["id"] == id) {
                    rank = rank
                } else if (allLevels["User"][allLevels["List"][i]]["level"] > Level) {
                    rank += 1
                } else if (allLevels["User"][allLevels["List"][i]]["level"] == Level) {
                    if (allLevels["User"][allLevels["List"][i]]["xp"] > allLevels["User"][id]["xp"]) {
                        rank += 1
                    }
                }
            }
            ranks[id] = rank
        }

        top10.sort((a, b) => ranks[a] - ranks[b]);

        var sendmsg = "Top 10 :\n"
        for (const player of top10) {
            let user = interaction.guild.members.cache.get(player.toString())
            sendmsg += "```swift\n" + `${ranks[player]}. ${user.nickname} : lvl${allLevels["User"][player]["level"]}\n` + "```"
        }
        await interaction.reply(sendmsg);
	},
};