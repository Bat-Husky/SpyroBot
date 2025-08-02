const { SlashCommandBuilder } = require('discord.js');
const { prefix, token, OwnerID, OwnerGuildID } = require('../../JSON/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping le bot'),
	async execute(interaction) {
		if (interaction.user.id == OwnerID) {
            interaction.client.user.setPresence({ activities: [{ name: `${prefix}help` , type: 3 }] });
            // const testChannel = guild.channels.cache.find(ch => ch.name === 'test');
            let Hours = Math.floor(interaction.client.uptime / 3600000);
            let Minutes = (Math.round((interaction.client.uptime / 60000) * 1000) / 1000) - (Hours * 60);
            sendmsg = `\`\`\`fix\nPing réussi !\n\`\`\`\nUptime : \n\`${Hours} hours\`\n\`${Minutes} minutes\``
        } else {
            sendmsg = "You can't use that command!"
        }
        await interaction.reply(sendmsg);
	},
};